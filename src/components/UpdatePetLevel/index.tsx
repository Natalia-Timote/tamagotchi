export default function UpdatePetLevel(prevPetLevel) {
    return {
        ...prevPetLevel,
        level: prevPetLevel.level + 1
    }
}