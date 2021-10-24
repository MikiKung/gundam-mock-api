const { checkOnlyNumber } = require('../lib/validate.lib')

// ประกาศว่า Gundam มีข้อมูลอะไรบ้าง
const Gundam = function (id, name, grade, price, height, shop_id) {
    this.id = id;
    this.name = name;
    this.grade = grade;
    this.price = price;
    this.height = height;
    this.shop_id = shop_id;
};

// อันนี้คือข้อมูลร้านที่ mock ขีันมา
let mockGundam = [
    // อันนี้คือข้อมูลตัวแรก
    {
        id: 1,
        name: "MG GUNDAM ASTRAY RED FRAME REVISE",
        grade: "A",
        price: 1800,
        height: 8,
        shop_id: 1
    },
    {
        id: 2,
        name: "MG STRIKE FREEDOM GUNDAM",
        grade: "A",
        price: 1730,
        height: 9,
        shop_id: 1
    },
    {
        id: 3,
        name: "RG GUNDAM ASTRAY GOLD FRAME AMATSU MINA",
        grade: "A",
        price: 1080,
        height: 9,
        shop_id: 2
    },
];
// function การเพิ่มข้อมูล **จะส่งข้อมูลให้ express ที่อยู่ในไฟล์ controller เพื่อให้ express เป็นตัวส่งข้อมูลอีกที่
// .add จะมาจากชื่อฟังชั่นในไฟล์ controller 
//*!ตัวอย่าง http://localhost:3000/gundam?name=ชื่อสินค้า&grade=เกรดสินค้า&price=ราคาสินค้า&height=ความสูงสินค้า&shop_id=อยู่ในร้านไหนตามid
// *! EX http://localhost:3000/gundam?name=ok&grade=A&price=3000&height=150&shop_id=1
Gundam.prototype.add = function (name, grade, price, height, shop_id) {
    // generate id ขึ้นมาโดยจะเอาค่า id ของ Mockshopตัวสุดท้ายมา +1
    const id = mockGundam[mockGundam.length - 1].id + 1;
    //   เอาไว้ validate ว่า name มีข้อมูลมั้ยถ้าไม่จะเเสดงข้อมูลในreturn
    if (typeof name == 'undefined') {
        return { status: 422, msg: "name is request" };
    }
    //   เอาไว้ validate ว่า Grade มีข้อมูลมั้ยถ้าไม่จะเเสดงข้อมูลในreturn
    if (typeof grade == 'undefined') {
        return { status: 422, msg: "grade is request" };
    }
    //   เอาไว้ validate ว่า price มีข้อมูลมั้ยเเละเป็นตัวเลขทั้งหมดมั้ย ถ้าไม่จะเเสดงข้อมูลในreturn
    // การเช็คว่าเป็นตัวเลขมั้ยนี่จะดึงข้อมูลมาจากไฟล์ validat.lib.js
    if (typeof price == 'undefined' || !checkOnlyNumber.test(price)) {
        return { status: 422, msg: "price is request or invalid" };
    }
     //   เอาไว้ validate ว่า height มีข้อมูลมั้ยเเละเป็นตัวเลขทั้งหมดมั้ย ถ้าไม่จะเเสดงข้อมูลในreturn
    // การเช็คว่าเป็นตัวเลขมั้ยนี่จะดึงข้อมูลมาจากไฟล์ validat.lib.js
    if (typeof height == 'undefined' || !checkOnlyNumber.test(price)) {
        return { status: 422, msg: "height is request or invalid" };
    }
     //   เอาไว้ validate ว่า shop_id มีข้อมูลมั้ยเเละเป็นตัวเลขทั้งหมดมั้ย ถ้าไม่จะเเสดงข้อมูลในreturn
    // การเช็คว่าเป็นตัวเลขมั้ยนี่จะดึงข้อมูลมาจากไฟล์ validat.lib.js
    if (typeof shop_id == 'undefined' || !checkOnlyNumber.test(shop_id)) {
        return { status: 422, msg: "shop_id is request or invalid" };
    }
    mockGundam.push({
        id,
        name: name.toString(),
        grade: grade.toString(),
        price: parseInt(price),
        height: parseInt(height),
        shop_id: parseInt(shop_id),
    });
    return { status: 200, msg: "Gundam added successfully", data: mockGundam[mockGundam.length - 1] };
};

// fuction การget by ID ข้อมูล
//*!ตัวอย่าง http://localhost:3000/gundam/get?id=2
Gundam.prototype.get = function (id) {
    let data = mockGundam.find((data) => data.id == id);
    if (!data) {
        return {
            status: 204,
            msg: "Gundam not found require id",
            data: data,
        };
    }
    return {
        status: 200,
        msg: "Gundam found successfully",
        data: data,
    };
};

// fuction แสดงข้อมูลทั้งหมดในmockshop
//*!ตัวอย่าง http://localhost:3000/gundam
Gundam.prototype.getAll = function () {
    return {
        status: 200,
        msg: "Gundam found successfully",
        data: mockGundam
    };
};

// อันนี้เป็นการลบข้อมูลรายการสินค้า
//*!ตัวอย่าง http://localhost:3000/gundam/delete?id=1
Gundam.prototype.removeData = function (id) {
    mockGundam = mockGundam.filter((data => {
        return id != data.id
    }))
    return {
        status: 200,
        msg: "Gundam found successfully",
        data: mockGundam
    };
};

// อันนี้เป็นการลบข้อมูลรายการสินค้าที่ถูกสร้างมาเพื่อให้ไฟล์ shopดึงไปใช้หลังจากลบร้านไปเเล้ว ต้องลบสินค้าในร้านด้วย
const removeGundam = (id) => {
    mockGundam = mockGundam.filter((data) => {
        return id != data.shop_id
    })
}

// fuction การเเก้ไข 
//*!ตัวอย่าง http://localhost:3000/gundam/edit?id=2&name=okk&grade=A&price=3000&height=150
Gundam.prototype.edit = function (id, name, grade, price, height) {
    let data = mockGundam.findIndex((data) => data.id == id);
    if (data == -1) {
        return {
            status: 204,
            msg: "Shop edit not found id",
        };
    }
    if (typeof name != "undefined") {
        mockGundam[data].name = name
    }
    if (typeof grade != "undefined") {
        mockGundam[data].grade = grade
    } if (typeof price != "undefined") {
        mockGundam[data].price = price
    } if (typeof height != "undefined") {
        mockGundam[data].height = height
    }
    return { status: 200, msg: "Gundam edit successfully", data: mockGundam[data] };

}


module.exports = {
    mockGundam,
    Gundam,
    removeGundam
};
