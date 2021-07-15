
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const consultants = [{
    name: "George Millanzi",
    hospitl: "Khairuki",
    region: "DSM",
    status: "online",
    expertise: "Dentist"
},
{
    name: "George Millanzi",
    hospitl: "Khairuki",
    region: "DSM",
    status: "online",
    expertise: "Dentist"
}]

export async function getConsultants() {
    await sleep(3000)
    return consultants
}