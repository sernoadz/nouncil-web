/**
 * Page to display current set of applicants for the Nouncil.
 *
 * This page takes data from the AddressForm linked on the home page (at the apply button)
 * and pipes it through the AddressForm API to this page.
 *
 * We filter to applications from the last 30 days becasuse the Nouncil does monthly application cycles.
 */
import Head from "next/head";
import Image from "next/image";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { fetchApplicationFormData } from "../utils/fetch-application-info";
import {
  getCurrentMonthString,
  buildEtherscanAddressLink,
  buildTwitterLink,
  urlify,
  shortenAddress,
} from "../utils/presentation-utils";

export const getServerSideProps = async (context) => {
  let formData = [];
  // Wrap API call in try-catch so that in the unlikely event
  // of an API error we don't crash the page (we will just show no results)
  try {
    // Fetch applicants from API
    formData = await fetchApplicationFormData();
  } catch (e) {
    console.log(e);
  }
  return {
    props: { formData },
  };
};

export default function Applications({ formData }) {
  return (
    <>
      <Head>
        <title>Nouncil Applications</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content={`Nouncil Applicants - ${getCurrentMonthString()} ${new Date().getFullYear()}`}
        />
        <meta property="og:url" content="https://nouncil.wtf/" />
        <meta property="og:site_name" content="Nouncil" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Applications for Nouncil membership"
        />
        <meta
          property="og:image"
          content="https://nouncil.netlify.app/social.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="750" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nouncil" />
        <meta name="twitter:url" content="https://nouncil.wtf/" />
        <meta name="twitter:title" content="Nouncil" />
        <meta
          name="twitter:description"
          content="Applications for Nouncil membership"
        />
        <meta
          name="twitter:image"
          content="https://nouncil.netlify.app/social.png"
        />
      </Head>

      <div className="border-noun-red border-t-[12px] bg-slate-200 text-slate-900">
        <div className="container flex flex-col items-center px-8 mx-auto">
          <div className="md:my-10 w-32 my-8">
            <Image
              src="/nouncil-logo.png"
              alt="Nouncil"
              width={408}
              height={384}
              layout="responsive"
              priority
            />
          </div>

          <div className="w-full mb-20">
            <div className="rounded-2xl px-10 pt-5 pb-10 mb-8 bg-white">
              <h2 className="font-nouns md:text-4xl mb-2 text-3xl mb-5">
                Nouncil Applicants - {getCurrentMonthString()}{" "}
                {new Date().getFullYear()}
              </h2>
              <ul className="text-slate-600 text-lg leading-relaxed">
                {formData.map((response) => {
                  return (
                    <li
                      className="py-1 mb-3 border-b-2 border-slate-100"
                      key={response.id}
                    >
                      <span className="mb-1">
                        <h1 className="font-nouns text-2xl text-slate-900">
                          {response.discord}
                        </h1>
                      </span>
                      <div className="text-sm text-slate-600 flex">
                        <div className="hover:underline hover:text-slate-900 cursor-pointer transition ease-in-out 125">
                          <a
                            className="flex"
                            target="_blank"
                            rel="noreferrer"
                            href={buildEtherscanAddressLink(response.address)}
                          >
                            {response.ens
                              ? response.ens
                              : shortenAddress(response.address)}{" "}
                            <ExternalLinkIcon
                              className="h-5 w-5 ml-1 mr-1 opacity-60"
                              style={{
                                marginTop: "-0.05rem",
                              }}
                            />{" "}
                          </a>
                        </div>
                        {response.twitter && (
                          <div className="border-l-2 pl-2 mr-2">
                            <a
                              href={buildTwitterLink(response.twitter)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <svg
                                className="w-5 h-5 opacity-60 cursor-pointer transition ease-in-out 125 hover:opacity-100"
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <title>Twitter</title>
                                <path
                                  fill="rgb(71 85 105)"
                                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                                />
                              </svg>
                            </a>
                          </div>
                        )}
                        <div className="border-l-2 pl-2 hidden lg:flex">
                          <svg
                            className="h-5 w-5 opacity-60 mr-2"
                            viewBox="0 0 71 55"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0)">
                              <path
                                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                                fill="rgb(71 85 105)"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect width="71" height="55" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          {response.discord}
                        </div>
                      </div>

                      <div className="mt-3 text-slate-900 text-lg w-full">
                        {urlify(response.personal_statement)}
                      </div>

                      <div className="flex lg:hidden text-sm text-slate-600 mt-3">
                        <svg
                          className="h-5 w-5 opacity-60 mr-2"
                          viewBox="0 0 71 55"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                              fill="rgb(71 85 105)"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="71" height="55" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        {response.discord}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-start w-full overflow-hidden leading-none bg-white">
          <div className="h-32">
            <img
              className="lg:scale-100 rendering-pixelated xl:object-contain z-0 object-none object-top w-full h-full scale-110"
              src="/footer.png"
              alt="Nouncillors"
              width="2192"
              height="208"
            />
          </div>

          <a
            target="_blank"
            rel="noreferrer"
            className="hover:bg-slate-200 bg-slate-100 border-slate-200 rounded-xl flex items-center px-5 py-3 mt-12 text-lg transition border"
            href="https://etherscan.io/enslookup-search?search=nouncil.eth"
          >
            <svg
              className="w-5 h-5 mr-1.5 fill-slate-600"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Ethereum</title>
              <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
            </svg>
            Nouncil.eth
          </a>
          <div className="relative z-10 flex items-center justify-center gap-8 pt-8 pb-20">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/nouncil"
              className="fill-slate-800 hover:fill-cyan-500 transition"
            >
              <svg
                className="w-10 h-auto"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitter</title>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://medium.com/@nouncil"
              className="fill-slate-800 hover:fill-slate-600 transition"
            >
              <svg
                className="w-10 h-auto"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Medium</title>
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://linkedin.com/company/nouncil"
              className="fill-slate-800 hover:fill-sky-700 transition"
            >
              <svg
                className="w-10 h-auto"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://facebook.com/nouncil"
              className="fill-slate-800 hover:fill-blue-500 transition"
            >
              <svg
                className="w-10 h-auto"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Facebook</title>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
