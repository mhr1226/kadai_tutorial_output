const today = new Date();

const year = today.getFullYear();

// Storingは文字列に変換するためのもの？
const month = String(today.getMonth() + 1).padStart(2,0);

const day = String(today.getDate()).padStart(2,'0');

const formatDate =`${year}年${month}月${day}日`;

console.log(formatDate);