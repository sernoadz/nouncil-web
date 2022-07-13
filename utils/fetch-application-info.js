import { getENS } from "./presentation-utils";

const ADDRESS_FORM_API_KEY = "e8d143d0-c540-474e-a064-2f1dbe485c18";
const APPLICATION_FORM_ID = "25e8e038-3208-4c65-b200-7dea6a550d9a";

const ADDRESS_FORM_API_BASE_URL =
  "https://api.addressform.io/ext-api/v1/form-responses?";

const MAX_AGE_DAYS = 30;

/**
 * Fetch data from AddressForm API
 */
export const fetchApplicationFormData = async () => {
  const apiResponse = await fetch(
    `${ADDRESS_FORM_API_BASE_URL}api_key=${ADDRESS_FORM_API_KEY}&form_id=${APPLICATION_FORM_ID}`
  );

  // Need to await on all responses for ENS to resolve
  return await postProcessAPIResponse(await apiResponse.json());
};

/**
 * Process API response into data to be displayed on the page
 * @param apiResponse  AddressForm API response
 * @returns Data for display on the page
 */
const postProcessAPIResponse = async (apiResponse) => {
  const result = apiResponse.responses
    .filter(
      (response) =>
        daysDifferenceTimestamps(new Date() / 1000, response.timestamp) <=
        MAX_AGE_DAYS
    )
    .sort(
      // Sort in reverse chrono order
      (response1, response2) => response2.timestamp - response1.timestamp
    )
    .map(async (response) => {
      return {
        address: response.responder_address,
        ens: await getENS(response.responder_address),
        twitter: (fetchFieldByString(response.response_data, "twitter") ?? "")
          .replace("@", "")
          .replace("https://twitter.com/", ""),
        discord: fetchFieldByString(response.response_data, "discord"),
        personal_statement: fetchFieldByString(
          response.response_data,
          "Nounish"
        ),
      };
    });

  return await Promise.all(result);
};

/**
 * Get difference in days between two unix timestamps
 *
 * Note: unix timestamps means they are 1000x javascript default timestamps
 *
 * @param timestamp1 unix timestamp
 * @param timestamp2  unix timestamp
 * @returns Difference between timestamp1 and timestamp2 in days
 */
const daysDifferenceTimestamps = (timestamp1, timestamp2) => {
  var difference = timestamp1 - timestamp2;
  var daysDifference = Math.floor(difference / 60 / 60 / 24);

  return daysDifference;
};

/**
 * Helper function to fetch specific fields from AddressForm API response
 * @param data Field level AddressForm API response
 * @param key  String you're trying to match in API response prompt
 * @returns Matching API response field if one exists, else null
 */
const fetchFieldByString = (data, key) => {
  const filtered = data.filter((element) => {
    return element.prompt.toLowerCase().includes(key.toLowerCase());
  });

  if (filtered.length > 0) {
    return filtered[0].response;
  }
  return null;
};
