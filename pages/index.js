import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card'


    export const getServerSideProps = async (context) => {

      // Fetching de notre route
      // API fetching
      const res = await fetch('https://api.cloudnouns.com/v1/nouncil')

      // Récupération des données de notre requête
      // Cast value to json object
      const nouns = await res.json()

      return {
          // Approvisionnement des props de notre page
          // Sending articles to page
          props: {nouns: nouns}
      }
  }


export default function Home({nouns}) {
  return (
    <>

    <Head>
      <title>Nouncil</title>
      <link rel="icon" href="/favicon.svg" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="Nouncil"/>
      <meta property="og:url" content="https://nouncil.wtf/"/>
      <meta property="og:site_name" content="Nouncil"/>
      <meta property="og:type" content="website"/>
      <meta property="og:description" content="A place for Nounish builders and project leaders to co-ordinate with Nouns DAO."/>
      <meta property="og:image" content="https://nouncil.netlify.app/social.png"/>
      <meta property="og:image:type" content="image/png"/>
      <meta property="og:image:width" content="1500"/>
      <meta property="og:image:height" content="750"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:site" content="@nouncil"/>
      <meta name="twitter:url" content="https://nouncil.wtf/"/>
      <meta name="twitter:title" content="Nouncil"/>
      <meta name="twitter:description" content="A place for Nounish builders and project leaders to co-ordinate with Nouns DAO."/>
      <meta name="twitter:image" content="https://nouncil.netlify.app/social.png"/>
    </Head>

    <div className="border-noun-red border-t-[12px] bg-slate-200 text-slate-900">

      <div className="container flex flex-col items-center px-8 mx-auto">

        <div className="md:my-10 w-32 my-8">
          <Image src="/nouncil-logo.png" alt="Nouncil" width={408} height={384} layout="responsive" priority />
        </div>

        <a className="sm:w-auto hover:bg-opacity-80 bg-noun-red font-nouns rounded-xl sm:mb-20 w-full px-8 py-3 mb-8 text-xl text-center text-white transition" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1wGOWfLYYiYK9PrAyH4Q-uAWsiwals818XFocYXAh1pY/edit">Apply for Membership</a>

        <div className="rounded-2xl lg:grid-cols-8 md:grid-cols-4 grid grid-cols-3 gap-5 px-10 pt-5 pb-10 mb-8 bg-white">
          <h2 className="font-nouns md:text-4xl lg:col-span-8 md:col-span-4 col-span-3 mb-2 text-3xl">Delegated Nouns ({nouns.data.nouns.length})</h2>
          {nouns.data.nouns.map((el, key) => (
            <div key={key} className="group bg-noun-cool relative overflow-hidden rounded-md">
              <div className="child group-hover:bg-opacity-40 group-hover:opacity-100 absolute z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-0 opacity-0">
                <h3 className="font-nouns md:text-xl text-white">Noun {el.id}</h3>
              </div>
              <a href={`https://nouns.wtf/noun/${el.id}`} target="_blank" rel="noreferrer">
                <img className="group-hover:blur-sm" src={`https://beta.noun-api.com/nounsdao/${el.id}`} alt={`Noun ${el.id}`}  />
              </a>
            </div>
            ))}
        </div>

        <div className="lg:grid-cols-2 lg:gap-10 grid w-full gap-8 mb-20">
          <Card title="Governance" image="/head-gavel.png">
            <ul className="text-slate-600 divide-slate-100 border-b-slate-100 text-lg leading-relaxed border-b divide-y">
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1NZXpxwJcTfjuafqRaSfl8TMJ8uQR2tX_JFSn5WO5nzg/edit?usp=sharing">Governance Draft</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://lizard-yarn-ffc.notion.site/d8a19bd7092048019e103ae20663fc5b?v=9e7534bd1fa646f3804fd4600dd2b6d3">Meetings</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1Vj7yLxh7VK4TpfN8o8N7oeL-OJb6aYwkx5KegwDPEWg/edit?usp=sharing">Voting Record</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1nNkUrRFzAhrnnyoWkRvS64_D53eGp41f_eQtxFQys1E/edit?usp=sharing#">Nouncil Planning</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1gxXEoxUhHbcRZVSIB3mVbmRp3lfv-clnevIMuqiY2Jo/edit">Nouncil Membership</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1zEdaZL_oF9-bG7h2mimb8PB2DNMFVoVr24OFF5eoeE4/">Welcome to Nouncil</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://hackmd.io/tm6WjUwmT-6tFyiNtZ55jQ">Nouncil Proposal #1 - Final Draft</a></li>
            </ul>
          </Card>
          <Card title="Programs" image="/head-dictionary.png">
          <ul className="text-slate-600 divide-slate-100 border-b-slate-100 text-lg leading-relaxed border-b divide-y">
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1LNVP0DBLPdoxgRy6Cb0egU7TSaljkheJ0idT_JP6koY/edit?usp=sharing">Retroactive Coordinape Rounds: Round 1 Result</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1-ILWgan1SweRZxRlT0xkQnebh7K5-z1cCn-50qk7KzY/edit?usp=sharing">Nouncillor Permissionless Grant Guidelines</a></li>
            </ul>
          </Card>
          <Card title="Tools" image="/head-drill.png">
          <ul className="text-slate-600 divide-slate-100 border-b-slate-100 text-lg leading-relaxed border-b divide-y">
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1bhQyEIi56qoyjM4m8nZRrmmm59HPz9mO3RjUOnredRM/edit?usp=sharing">Toga Template</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://togatime.cloudnouns.com/">Toga Time</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1tmvCRo4HSv4cGU1Z_Y9BOVOJlG0vrAa1BDDb3RGW4YM/edit?usp=sharing">Delegated Noun Tools</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1MDYV56Lmm_qd18O7hQLYD3gTZoISzm0ZpONGbK7Gp-Q/edit">How to Delegate to Nouncil</a></li>
            </ul>
          </Card>
          <Card title="Miscellaneous" image="/head-abstract.png">
          <ul className="text-slate-600 divide-slate-100 border-b-slate-100 text-lg leading-relaxed border-b divide-y">
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://app.poap.xyz/token/4714306">OG Nouncillor POAP</a></li>
              <li className="py-1"><a className="hover:text-noun-red block" target="_blank" rel="noreferrer" href="https://twitter.com/SuperTightWoody/status/1513986196409565185">Theme Song</a></li>
            </ul>
          </Card>
        </div>

      </div>

      <div className="relative flex flex-col items-center justify-start w-full overflow-hidden leading-none bg-white">
          <div className="h-32"><img className="lg:scale-100 rendering-pixelated xl:object-contain z-0 object-none object-top w-full h-full scale-110" src="/footer.png" alt="Nouncillors" width="2192" height="208" /></div>

          <a target="_blank" rel="noreferrer" className="hover:bg-slate-200 bg-slate-100 border-slate-200 rounded-xl flex items-center px-5 py-3 mt-12 text-lg transition border" href="https://etherscan.io/enslookup-search?search=nouncil.eth">
          <svg className="w-5 h-5 mr-1.5 fill-slate-600" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Ethereum</title><path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/></svg>
            Nouncil.eth
            </a>
          <div className="relative z-10 flex items-center justify-center gap-8 pt-8 pb-20">
            <a target="_blank" rel="noreferrer" href="https://twitter.com/nouncil" className="fill-slate-800 hover:fill-cyan-500 transition">
              <svg className="w-10 h-auto" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a target="_blank" rel="noreferrer" href="https://medium.com/@nouncil" className="fill-slate-800 hover:fill-slate-600 transition">
            <svg className="w-10 h-auto" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Medium</title><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
            </a>
            <a target="_blank" rel="noreferrer" href="https://linkedin.com/company/nouncil" className="fill-slate-800 hover:fill-sky-700 transition">
            <svg className="w-10 h-auto" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a target="_blank" rel="noreferrer" href="https://facebook.com/nouncil" className="fill-slate-800 hover:fill-blue-500 transition">
            <svg className="w-10 h-auto" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>

      </div>

    </div>
    </>
  )
}
