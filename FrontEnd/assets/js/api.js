async function getWorks(){
    const works = await fetch('http://localhost:5678/api/works')
    return await works.json()
}

async function getCategories(){
    const categories = await fetch('http://localhost:5678/api/categories')
    return await categories.json()
}

async function deleteWork(workId){
    return await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

async function addWork(data){
    return await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}