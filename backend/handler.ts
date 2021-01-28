import { APIGatewayProxyHandler } from "aws-lambda"
import { createClient } from "@supabase/supabase-js"
import apiResponses from "./apiResponses"
import { utils } from "ethers"

type Profile = {
    address: string
    description: string
    avatar: string
    cover: string
}

type Request = {
    profile: Profile
    signature: string
}

const verifySignature = (profile: Profile, signature: string) => {
    const address = utils.verifyMessage(JSON.stringify(profile), signature)
    return address === profile.address
}

const updateProfileRecord = async (profile: Profile) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    const record = { profile }
    const { error } = await supabase.from("Profiles").insert([profile])
    if (error) throw error
    console.log(`updated record: ${JSON.stringify(record)}`)
}

export const updateProfile: APIGatewayProxyHandler = async (event) => {
    let profile, signature
    try {
        profile = (event as any as Request).profile
        signature = (event as any as Request).signature
    } catch (e) {
        console.log(`malformed request: ${JSON.stringify(event as any)} - ${e.toString()}`)
        return apiResponses._400({ error: "malformed request" })
    }

    try {
        if (!verifySignature(profile, signature)) {
            throw "invalid signature"
        }
    } catch (e) {
        console.log(`invalid signature: ${signature}`)
        return apiResponses._400({ error: "invalid signature" })
    }

    await updateProfileRecord(profile)
    
    return apiResponses._200({})
}