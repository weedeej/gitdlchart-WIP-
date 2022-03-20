import type { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from "@octokit/rest";
import { useRouter } from 'next/router';
const ChartJsImage = require('chartjs-to-image');

type Data = {
  name: string
  image_bin: string
}
const chartData = new ChartJsImage();

export default async function handler(req: NextApiRequest,res: NextApiResponse<any>) {
  const { owner, repo, asset_name } = req.query;
  if (!owner || !repo || !asset_name) {
    return res.status(400).json({
        error: 'Missing owner, repo or asset_name'
    });
  }
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });
  const releases = await octokit.rest.repos.listReleases({
    owner: owner.toString(),
    repo: repo.toString(),
  }).catch(err => {
      return undefined;
  });

  if (!releases) {
    return res.status(400).json({
        error: 'No releases/repo found'
    });
  }
  const releaseObject = releases.data.map(release => {
    const asset = release.assets.find(asset => asset.name === asset_name);
    if (asset !== undefined) {
      return {
        name: release.tag_name,
        download_count: asset.download_count,
      }
    }
  }).reverse();
  if (releaseObject.keys.length < 1) {
    return res.status(400).json({
        error: 'No releases found'
    });
  }
  const totalDownloads = releaseObject.reduce((acc, curr) => {
    curr = curr? curr : {name:'',download_count: 0};
    return acc + curr.download_count;
  }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  chartData.setConfig({
    type: 'bar',
    data: { labels: releaseObject.map(tag => `(${tag?.download_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}) v${tag?.name}`), datasets: [{ label: 'Release Version', data: releaseObject.map(tag => tag?.download_count) }, {label: `Total: ${totalDownloads}`, datasets:[]} ] },
  });

  if (req.query.embed !== undefined) {
      res.setHeader('Content-Type', 'image/png');
      return res.status(200).send(await chartData.toBinary());
  }
  const response: Data = {
    name: 'test',
    image_bin: await chartData.toDataUrl()
  }
  return res.status(200).json(response);
}