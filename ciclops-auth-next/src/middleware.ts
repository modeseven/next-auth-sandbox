import { NextRequestWithAuth, withAuth } from "next-auth/middleware";


function middleware(req: NextRequestWithAuth) {
    console.log("middleware", req);
}

function authorized(req: NextRequestWithAuth) {
    console.log("authorize", req);
}

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            console.log("authorized!!", token);
        },
    },
    middleware,
});


export const config = {
    matcher: ["/test"],
};