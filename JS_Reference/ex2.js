// -Ex2-
let c = {
  c1: "Omachi",
  c2: {
    c3: "HaoHao",
  },
};

console.log("c: ", c);

let d = {
  d1: c.c1,
  d2: c2.c3,
};

let e = c;
c.c1 = "TaoQuan";
c.c2 = {
  c3: "Chinsu",
};
//d? e?

console.log("d: ", d);
console.log("c: ", c);
console.log("e: ", e);

/*
  - Vì c2 không tồn tại nên sẽ bị lỗi: ReferenceError: c2 is not defined
  => Không khai báo được d.


  - Giá trị của e là 
    {
        "c1": "TaoQuan",
        "c2": {
            "c3": "Chinsu"
            }
        }
  Giải thích:
  Khi khai báo e = c thì e và c trỏ về cùng một vùng nhớ có giá trị
  {
  c1: "Omachi",
    c2: {
        c3: "HaoHao",
    },
    };

 Do đó khi đổi:
 c.c1 = "TaoQuan";
 c.c2 = {
      c3: "Chinsu",
 };
 Thì giá trị của e và c cùng là:
   {
        "c1": "TaoQuan",
        "c2": {
            "c3": "Chinsu"
            }
        }

*/
