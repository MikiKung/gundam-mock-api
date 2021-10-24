// import express มาใช้
const express = require("express");
//  เก็บ function express ที่ import มาเอาไปไว้ในตัวแปร app
const app = express();
// เรียกเอา express ที่เราเขียนไว้ใน folder controller
const { gundam, shop } = require("./controller");

// โชว์ข้อมูล
app.use(express.json());
// ประกาศไว้เพื่อเวลาจะใช้งาน pathของข้อมูลไหนจะต้องมี /อันนั้นนำหน้าก่อน
app.use("/gundam", gundam);
app.use("/shop", shop);

// เช็คใน terminal ว่าcode ทำงานได้ปกติหรือไม่
app.listen(3000, () => console.log("list port 3000"));

module.exports = app;
