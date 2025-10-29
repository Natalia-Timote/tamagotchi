export const happyPet = (prevPetStatus) => {
    return {
        ...prevPetStatus,
        happiness: prevPetStatus.happiness < 100 ? prevPetStatus.happiness + 10 : 100
    }
}


export default {
    happyPet
}