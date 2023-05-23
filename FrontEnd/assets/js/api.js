// Se fichier charge les appels

async function getWorks(){
    const works = await fetch('http://localhost:5678/api/works')
    return works.json()
}

async function getCategories(){
    const categories = await fetch('http://localhost:5678/api/categories')
    return categories.json()
}

function deleteWork(workId){
    return fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

function addWork(data){
    return fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}