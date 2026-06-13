const COUNTRY_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  try {
    const response = await fetch(
      `${COUNTRY_URL}/all?fields=name,capital,cca2,cca3,flags,population,region,subregion`
    );

    const data = await response.json();

    console.log("API DATA:", data);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log("API Error:", error);
    return [];
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(
      `${COUNTRY_URL}/alpha/${code}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCountryWikiInfo = async (countryName) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        countryName
      )}`
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};