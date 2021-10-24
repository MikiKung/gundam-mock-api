const { removeGundam, mockGundam } = require("./gundam.module");
// ประกาศว่า Shop มีข้อมูลอะไรบ้าง
const Shop = function (id, name, city) {
    this.id = id;
    this.name = name;
    this.city = city
};
// อันนี้คือข้อมูลร้านที่ mock ขีันมา
let mockShop = [
    // อันนี้คือข้อมูลตัวแรก
    {
        id: 1,
        name: "bangundam",
        city: "bangkok",
    },
    {
        id: 2,
        name: "gundammodeltoy",
        city: "chaingmai",
    },
];

// function การเพิ่มข้อมูล **จะส่งข้อมูลให้ express ที่อยู่ในไฟล์ controller เพื่อให้ express เป็นตัวส่งข้ออมูลอีกที่
// .add จะมาจากชื่อฟังชั่นในไฟล์ controller 

// *!ตัวอย่างการpost http://localhost:3000/shop?name=ชื่อร้าน&city=ที่อยู่
Shop.prototype.add = function (name, city) {
    // generate id ขึ้นมาโดยจะเอาค่า id ของ Mockshopตัวสุดท้ายมา +1
    const id = mockShop[mockShop.length - 1].id + 1;
    //   เอาไว้ validate ว่า name มีข้อมูลมั้ย ถ้าไม่จะเเสดงข้อมูลในreturn
    if (typeof name == "undefined") {
        // status เราสามารถเปลี่ยนได้เองเลย status 422 คือข้อมูลไม่ครบหรือกรอกข้อมูลผิด 
        // msg คือข้อความที่จะเเสดง
        return { status: 422, msg: "name is request" };
    }
    //   เอาไว้ validate ว่า city มีข้อมูลมั้ย ถ้าไม่จะเเสดงข้อมูลในreturn
    if (typeof city == "undefined") {
        return { status: 422, msg: "city is request" };
    }
    // push คือการเพิ่มข้อมูลให้เข้าไปให้ express
    mockShop.push({
        id,
        name: name.toString(),
        city: city.toString(),
    });
    // จะ return ถ้าข้อผ่านการ validate เเละ pushข้อมูลตามด้านบน
    return {
        status: 200,
        msg: "Shop added successfully",
        // จะเเสดงตัวข้อมูลที่push-7ho mock ไป
        data: mockShop[mockShop.length - 1],
    };
};

// fuction การget by ID ข้อมูล
// *!ตัวอย่างการ get  http://localhost:3000/shop/get?id=1
// *!เลข1คือจะหาได้ตาม id ของร้าน
Shop.prototype.get = function (id) {
    // เช็คว่าในข้อมูลที่mock ของเรา มีid ที่เราต้องการหาอยู่มั้ย
    let data = mockShop.find((data) => data.id == id);
    // ถ้าไม่มี
    if (!data) {
        return {
            status: 204,
            msg: "Shop not found require id",
            data: data,
        };
    }
    // เก็บข้อมูลใหม่ไว้ในตัวแปรdata
    data = {
        // การดูข้อมูลทุกอันในdata
        ...data,
        // filterหาข้อมูลในmock ของ gundam ว่ามี FK (shop_id)ที่เหมือนกับ PK ของshop ถ้ามีจะถูกเก็บเข้าในdata บรรทัดที่64
        gundam: mockGundam.filter((data, i) => {
            if (data.shop_id == id) {
                return data;
            }
        }
        ),
    };
    // แสดงข้อมูล
    return {
        status: 200,
        msg: "Shop found successfully",
        data: data,
    };
};

// fuction แสดงข้อมูลทั้งหมดในmockshop
// *!ตัวอย่างการ get all http://localhost:3000/shop
Shop.prototype.getAll = function () {
    return {
        status: 200,
        msg: "Shop found successfully",
        data: mockShop
    };
};

// fuction การเเก้ไข 
// *!ตัวอย่างการ get all http://localhost:3000/shop/edit?id=1&name=ชื่อร้านที่เเก้ไข&city=เมือง
// *!edit ต้องมีการรับ id มาก่อน เเล้วถ้าจะเปลี่ยนชื่อหรืออcityหรืออทั้งคู่ก็ให้ใส่ตามหลังเเต่จะใส่ไม่ครบก็ได้เช่นอันบนมีครบทั้งชื่อเเละเมืองเเต่อันล่างเปลี่ยนเเค่ชื่อหรือเมือง
// *!http://localhost:3000/shop/edit?id=1&name=ชื่อร้านที่เเก้ไข
// *!http://localhost:3000/shop/edit?id=1&city=เมือง5
Shop.prototype.edit = function (id, name, city) {
    // เช็คว่าid ใน mock มีเหมือนที่จะหามั้ย
    let data = mockShop.findIndex((data) => data.id == id);
    // ถ้าไม่
    if (data == -1) {
        return {
            status: 204,
            msg: "Shop edit not found id",
        };
    }
    // ถ้ามีการเเก้ไข name เป็นundefineกมั้ย
    if (typeof name !== "undefined") {
        mockShop[data].name = name;
    }
    // ถ้ามีการเเก้ไข city เป็นundefineกมั้ย
    if (typeof city !== "undefined") {
        mockShop[data].city = city;
    }
    return { status: 200, msg: "Shop edit successfully", data: mockShop[data] };
};

// fuction การลบ
// *!ตัวอย่างการ delete http://localhost:3000/shop/delete?id=1
Shop.prototype.delete = function (id) {
    // อันนี้คือการลบข้อมูลในร้าน 
    mockShop = mockShop.filter((data) => {
        return id != data.id
    })
    // ออันนี้คือการลบข้อมูลของสินค้าในร้านซึ่งจะไปดึงมาจากอีกไฟล์เนื่อองจากมันใช้ ข้อมูลที่อยู่ในอีกไฟล์ 
    removeGundam(id);
    return { status: 200, msg: "Gundam delete Successfully" }
}

module.exports = {
    mockShop,
    Shop,
};
