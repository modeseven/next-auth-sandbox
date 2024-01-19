import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";


const authOptions: AuthOptions = {
    debug: false,
    providers: [
        {
            id: "mock-oauth",
            type: "oauth",
            name: "MockOAuth",
            jwks_endpoint: "http://localhost:3001/.well-known/jwks.json",
            clientId: "mock-client-id",
            clientSecret: process.env.NEXTAUTH_SECRET,
            // wellKnown: "http://localhost:3001/.well-known/openid-configuration",
            issuer: "mock",
            checks: ["state"],
            authorization: "http://localhost:3001/authorize",
            token: "http://localhost:3001/token",
            userinfo: { url: "http://localhost:3001/userinfo" },
            profile: (profile: { id: any, sub: any; name: any; email: any; }) => {
                return {
                    sub: profile.sub,
                    id: profile.id,
                    name: profile.name,
                    email: profile.email
                };
            }
        },
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            console.log("jwt")
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            console.log("session")
            // Send properties to the client, like an access_token from a provider.
            //@ ts-ignore
            session.accessToken = token.accessToken
            return session
        }
    }

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
