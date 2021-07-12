import { toggleStringFromList } from "../src/utils"

test("toggleStringFromList", () => {
    const myList = ["shallow", "dont", "save", "wanna"]

    expect(toggleStringFromList("shallow", myList).includes("shallow")).toBe(false)
    expect(toggleStringFromList("hello", myList).includes("hello")).toBe(true)
})