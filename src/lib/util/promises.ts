export function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "Rahul", age: 20 })
        }, 1000)
    })
}

export function fetchData2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Error")
        }, 1000)
    })
}

export function fetchData3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "Ram", age: 25 })
        }, 1000)
    })
}