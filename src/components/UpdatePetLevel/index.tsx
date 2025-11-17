import type IPetLevel from "../../interfaces/IPetLevel";

export default function UpdatePetLevel(prevPetLevel: IPetLevel) {
    return {
        ...prevPetLevel,
        level: prevPetLevel.level + 1
    }
}