import fetch from "node-fetch"; // برای ارسال درخواست به API
import fs from "fs"; // برای ذخیره داده‌ها در فایل

// ارسال درخواست به API و دریافت اطلاعات کشورها با استفاده از پارامتر fields
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,languages,currencies,flags"
)
  .then((response) => response.json()) // تبدیل پاسخ به JSON
  .then((countries) => {
    console.log("Response data:", countries); // نمایش داده‌ها برای بررسی نوع داده

    // بررسی اینکه آیا countries به صورت آرایه است
    if (Array.isArray(countries)) {
      const countryData = countries.reduce((acc, country) => {
        // استفاده از نام کشور به عنوان کلید شیء
        acc[country.name.common] = {
          CAPITAL_FA: country.capital ? country.capital[0] : "N/A", // پایتخت
          LANGUAGE_FA: Object.values(country.languages || {}).join(", "), // زبان‌ها
          CURRENCY_FA: Object.values(country.currencies || {})
            .map((curr) => curr.name)
            .join(", "), // واحد پول
          FLAG: country.flags ? country.flags.svg : "N/A", // کد پرچم
        };
        return acc;
      }, {});

      // ذخیره داده‌ها در یک فایل JSON
      fs.writeFile(
        "countries.json",
        JSON.stringify(countryData, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file", err);
          } else {
            console.log("Data has been written to countries.json");
          }
        }
      );
    } else {
      console.error("Received data is not an array", countries);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
