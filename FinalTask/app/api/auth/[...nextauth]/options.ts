import CredentialsProvider from "next-auth/providers/credentials";
import fetchData from "../../fetch";

export const options = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                // console.log("Credentials:", email, password);

                try {
                    const response = await fetchData({ email, password });
                    console.log("Response:", response);
                    if (response && response.id) {
                        return {
                            id: response.id,
                            email: response.email,
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken,
                            name: response.name,
                        };
                    }
                } catch (err) {
                    console.error('Failed to login:', err);
                }

                // Return null if authentication fails
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.accessToken = user.accessToken; // Ensure accessToken is stored
                token.refreshToken = user.refreshToken; // Store refreshToken
            }
            return token;
        },

        async session({ session, token }: { session: any, token: any }) {
            if (session?.user) {
                session.user.accessToken = token.accessToken; // Add accessToken to session
                session.user.refreshToken = token.refreshToken; // Add refreshToken to session
            }
            return session;
        },

        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            return baseUrl; // Redirect to the base URL after successful login
        },
    },
};
