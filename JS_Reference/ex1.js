// -Exl-
let a = {
  a1: 2,
  a2: {
    a3: 1,
  },
};

let b = [];
b.push(a.a2);
b[0].a3 = 2;
//a??
console.log("a: ", a);
console.log("b: ", b);

/*
 Giá trị của a là:
 {
  a1: 2,
  a2: {
      a3: 2,
    },
};

  Giải thích:
  Trong Javascript Objects, arrays và functions là reference types.
  Do đó
  a.a2 trỏ về vùng nhớ lưu object {a3: 1}
  Khi b.push(a.a2) thì b[0] cũng trỏ về vùng nhớ lưu object {a3: 1}
  Do đó khi b[0].a3 = 0 => giá trị object trên từ {a3: 1} -> {a3: 2}
  a.a2 cũng trỏ về địa chỉ đó nên a.a2 = {a3: 2}
  Do đó:
  a =  {
      a1: 2,
      a2: {
          a3: 2,
        },
    };

*/
