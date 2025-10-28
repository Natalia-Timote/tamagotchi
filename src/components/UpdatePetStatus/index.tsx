export default function UpdatePetStatus(prevPetStatus) {
        return {
            ...prevPetStatus,
            study: prevPetStatus.study > 0 ? prevPetStatus.study - 1 : 0,
            rest: prevPetStatus.rest > 0 ? prevPetStatus.rest - 1 : 0,
            happiness: prevPetStatus.happiness > 0 ? prevPetStatus.happiness - 1 : 0
        }
}
