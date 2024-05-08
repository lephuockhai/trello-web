// export const API_ROOT = 'http://localhost:8017'
let apiRoot = ''
//có thể sử dụng import.meta.env thay vi dung process.env
console.log('import.meta.env::', import.meta.env)
console.log('process.env::', process.env)
if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8017/'
}
if (process.env.BUILD_MODE === 'production') {
    apiRoot = 'https://trello-api-pndh.onrender.com'
}
export const API_ROOT = apiRoot