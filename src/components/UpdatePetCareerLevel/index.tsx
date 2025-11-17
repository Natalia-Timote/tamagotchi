import type IPetLevel from "../../interfaces/IPetLevel"

export default function UpdatePetCareerLevel(prevPetLevel: IPetLevel) {
    function updateCareer() {
        if (prevPetLevel.level >= 12) {
            return (
                prevPetLevel.careerLevel = "Tech Lead"
            )
        } else if (prevPetLevel.level >= 9) {
            return (
                prevPetLevel.careerLevel = "Senior"
            )
        } else if (prevPetLevel.level >= 6) {
            return (
                prevPetLevel.careerLevel = "Pleno"
            )
        } else if (prevPetLevel.level >= 3) {
            return (
                prevPetLevel.careerLevel = "Júnior"
            )
        } else {
            return (
                prevPetLevel.careerLevel = "Estagiário"
            )
        }
    }

    return {
        ...prevPetLevel,
        careerLevel: updateCareer()
    }
}