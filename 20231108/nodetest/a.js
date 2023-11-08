const a1 = 1
const a2 = 2
let a3 = 3
const test = () => {
	a3 += 100
}
const test2 = () => {
	return a1
}
const test3 = () => {
	return a3
}

console.log(a3)

// 預設匯出
// 匯出 沒有名稱的預設 一個檔案只能有一個匯出
// 如果要匯出多個變數 要用大括號包起來
// 放在檔案的哪裡都可以
export default {
	a1,
	a2,
	a3,
	test,
	test2,
	test3
}
