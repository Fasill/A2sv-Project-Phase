import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers: [
       
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile)
                

                let userRole = "Google User";
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_Secret ?? '',
        }),
    ],
    callbacks:{
        async jwt({token, user}: {token: any, user: any}){
            if(user) token.role = user.role;
            return token
        },

        async session({session, token}:{session:any, token:any}){
            if (session?.user) session.user.role = token.role;
            return session
        },
        async redirect({ url, baseUrl }:{url:any,baseUrl:any }) {
            return baseUrl;
          },
    }
}