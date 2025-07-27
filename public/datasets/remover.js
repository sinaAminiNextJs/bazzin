import fs from "fs";

// خواندن داده‌های موجود از فایل‌های JSON
const sourceData = JSON.parse(fs.readFileSync("countries.geojson", "utf8"));
const addData = JSON.parse(fs.readFileSync("countries.json", "utf8"));

// فرض می‌گیریم که اطلاعات جدید در قالب شیء است که کشورها را به شناسه‌ی آن‌ها مرتبط می‌کند
const updatedFeatures = sourceData.features.map((oldFeature) => {
  // پیدا کردن کشور مشابه در داده‌های جدید بر اساس نام کشور
  const newProps = addData[oldFeature.properties.NAME];

  // اگر داده جدید برای کشور پیدا شد، آن را به ویژگی‌های موجود اضافه می‌کنیم
  if (newProps) {
    return {
      ...oldFeature, // حفظ نوع و هندسه
      properties: {
        ...oldFeature.properties, // ویژگی‌های قبلی کشور
        ...newProps, // ویژگی‌های جدید که از فایل جدید آمده‌اند
      },
    };
  } else {
    // اگر داده جدید برای این کشور وجود ندارد، فقط داده‌های قبلی را حفظ می‌کنیم
    return oldFeature;
  }
});

// ادغام ویژگی‌ها و ساختار کلی جدید GeoJSON
const updatedGeoJSON = {
  ...sourceData,
  features: updatedFeatures,
};

// ذخیره‌سازی فایل نهایی
fs.writeFileSync(
  "countries_merged.geojson",
  JSON.stringify(updatedGeoJSON, null, 2),
  "utf8"
);

console.log("✅ فایل نهایی ذخیره شد: countries_merged.geojson");
