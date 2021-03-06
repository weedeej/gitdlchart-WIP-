import type { NextPage } from 'next'

const Home: NextPage = () => {

  return (
    <div className="flex flex-row mx-auto container p-10">
      <div className='flex flex-col mx-auto container max-w-auto h-full border-2 border-black p-10 rounded-md'>
        <div className='border-2 border-yellow-100 mb-3 w-full'></div>
        <h1 className='text-3xl font-bold text-center'>GDLC: Github Download Chart</h1>
        <div className='my-3'>
          <p className='text-xl underline break-words text-center'>https://gitdlchart.vercel.app/api/<strong>{"<author>"}</strong>/<strong>{"<repo>"}</strong>/<strong>{"<asset_name>"}</strong></p>
        </div>
        <div className='border-2 border-yellow-100 mt-3 mb-5 w-full'></div>
        <div className='mx-auto container'>
          <ul className='gap-11 flex flex-col'>
            <li className='flex flex-col'>
              <h1 className='text-left text-2xl font-bold'>How does it work?</h1>
              <p className='text-left text-xl break-words shadow-lg border-2 rounded-xl p-5'>Sends an API Request to <em>api.github.com</em> to fetch the data for the given repo. The data is going to be displayed using <em>chartjs-to-image</em></p>
            </li>
            <li className='flex flex-col'>
              <h1 className='text-left text-2xl font-bold'>How is the data calculated?</h1>
              <p className='text-left text-xl break-words shadow-lg border-2 rounded-xl p-5'>No Calculation beside addition. Github API presents the data in complete form. This tool is just going to add all of them.</p>
            </li>
            <li className='flex flex-col'>
              <h1 className='text-left text-2xl font-bold'>How to embed the chart?</h1>
              <p className='text-left text-xl break-words shadow-lg border-2 rounded-xl p-5'>Add <em className='font-bold'>?embed</em> at the end of the URL then attach it like a normal image<br/>Example: <br/><br/><span className='shadow-inner shadow-black p-3'>
              https://gitdlchart.vercel.app/api/<strong>{"<author>"}</strong>/<strong>{"<repo>"}</strong>/<strong>{"<asset_name>"}</strong><em className='font-bold'>?embed</em>
                </span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
