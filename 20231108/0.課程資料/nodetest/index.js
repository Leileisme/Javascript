// import 自訂變數 from 檔案或套件
// 檔案寫相對路徑必須是 ./ 或 ../ 開頭
// './a.js' 是檔案，'a.js' 是 npm 套件
// import from 只能在最上面
import a from './a.js'

// 一次引用所有匯出
// import * as 自訂變數 from 檔案或套件
// import * as b from './b.js'
// 個別引用，變數名稱需和來源檔案一樣
// import { 變數1, 變數2, 變數3 as 自訂名稱 } from 檔案或套件
import { b1, b2, test as bbtest } from './b.js'

// 同時引用預設和具名匯出
import c, * as cc from './c.js'
// import c, { arr1 } from './c.js'

// 取得目前 node.js 執行檔的資料夾名稱
// CommonJS 語法
// console.log(`資料夾路徑: ${__dirname}`)
// console.log(`檔案名稱: ${__filename}`)
// ECMAScript 語法
console.log('import.meta.url: ' + import.meta.url)

// 直接修改值改不到原始檔案的值
console.log('a', a)
console.log('a.test2', a.test2())     // 1
a.a1 = 500
console.log('a.a1', a.a1)             // 500
console.log('a.test2', a.test2())     // 1

console.log('a.test3', a.test3())     // 3
a.a3 = 500
console.log('a.a3', a.a3)             // 500
console.log('a.test3', a.test3())     // 3

// 需要呼叫 function 修改
a.test()
console.log('a.a3', a.a3)             // 500
console.log('a.test3', a.test3())     // 103

console.log('==========================')

/*
console.log('b.b1', b.b1)             // 1
// 具名匯入的東西唯讀，不能修改
// TypeError: Cannot assign to read only property 'b1' of object '[object Module]'
// b.b1 = 100

console.log('b.b2', b.b2)             // 2
// 具名匯入的東西唯讀，不能修改，就算原本是 let 也一樣
// TypeError: Cannot assign to read only property 'b1' of object '[object Module]'
// b.b2 = 100
b.test()
console.log('b.b2', b.b2)             // 102
*/

console.log(b1)                       // 1
// 不管來源是 const 還是 let，都不能修改
// Assignment to constant variable.
// b1 = 100

console.log(b2)                       // 2
// Assignment to constant variable.
// b2 = 100

bbtest()
console.log(b2)                       // 102

console.log('==========================')

// 不管具名或預設
// 如果引用的資料型態是物件或陣列
// 修改時會一起改到原本檔案的值 (PASS BY REFERENCE)
console.log(c.arr2)                   // [a, b, c, d]
c.arr2.push('e')
console.log(c.arr2)                   // [a, b, c, d, e]
console.log(c.test())                 // [a, b, c, d, e]

console.log(cc.arr1)                  // [1, 2, 3, 4]
cc.arr1.push(5)
console.log(cc.arr1)                  // [1, 2, 3, 4, 5]