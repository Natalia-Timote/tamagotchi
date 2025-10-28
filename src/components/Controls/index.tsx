export const restPet = (prevPetStatus) => {
    return {
        ...prevPetStatus,
        rest: prevPetStatus.rest < 100 ? prevPetStatus.rest + 10 : 100
    }
}

export const happyPet = (prevPetStatus) => {
    return {
        ...prevPetStatus,
        happiness: prevPetStatus.happiness < 100 ? prevPetStatus.happiness + 10 : 100
    }
}


export default {
    restPet,
    happyPet
}