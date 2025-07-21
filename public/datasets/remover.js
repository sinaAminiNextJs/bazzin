const fs = require("fs");

// فایل‌ها رو بخونیم
const sourceData = JSON.parse(fs.readFileSync("countries_source.json", "utf8"));
const newData = JSON.parse(fs.readFileSync("countries.json", "utf8"));

// یک تابع برای خلاصه کردن جمعیت
function formatPopulationFa(number) {
  return Math.round(number / 1_000_000) + " میلیون";
}

// فرض می‌گیریم که ترتیب کشورهای هر دو فایل یکیه
const updatedFeatures = sourceData.features.map((oldFeature, index) => {
  const newProps = newData.features[index];

  // اضافه کردن جمعیت خلاصه شده فارسی
  const pop = newProps.POP_EST || 0;
  newProps.POP_EST_FA = formatPopulationFa(pop);

  return {
    ...oldFeature, // حفظ type و geometry
    properties: {
      ...newProps,
    },
  };
});

const updatedGeoJSON = {
  ...sourceData,
  features: updatedFeatures,
};

// ذخیره فایل نهایی
fs.writeFileSync(
  "countries_merged.geojson",
  JSON.stringify(updatedGeoJSON, null, 2),
  "utf8"
);
console.log("✅ فایل نهایی ذخیره شد: countries_merged.geojson");
