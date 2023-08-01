import { hash } from "bcrypt";
import { prismaClient } from "../src/database/prismaClient";

async function main() {
    const passwordHash = await hash("admin", 8);

    const user = {
        name: "admin",
        email: "admin@example.com",
        password: passwordHash,
    }

    await prismaClient.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        }
    })

}

main()