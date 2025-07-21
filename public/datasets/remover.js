const fs = require("fs");
function formatPopulationFa(pop) {
  const million = 1000000;
  if (pop >= million) {
    // گرد به بالا و خلاصه با "میلیون"
    const millions = Math.round(pop / million);
    return `${millions} میلیون نفر`;
  }
  // اگر کمتر از یک میلیون بود، فقط عدد را برمی‌گرداند
  return pop.toString();
}
// فایل geojson رو بخون
const rawData = fs.readFileSync("countries_clean.geojson", "utf8");
const geojson = JSON.parse(rawData);

// فقط ویژگی‌های مهم رو نگه داریم
geojson.features = geojson.features.map((feature) => {
  const filteredProps = { ...feature };
  const newPop = formatPopulationFa(feature.POP_EST);
  filteredProps.POP_EST_FA = newPop;
  return {
    properties: filteredProps,
  };
});

// ذخیره فایل خروجی
fs.writeFileSync("countries_2.geojson", JSON.stringify(geojson, null, 2));
console.log("فایل فیلتر شده ذخیره شد: countries_clean.geojson");
