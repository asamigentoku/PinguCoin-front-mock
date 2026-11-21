import { cookies } from "next/headers";

export const MOCK_SESSION_COOKIE = "pingucoin_mock_session";
export type MockUser = { id: string; name: string; email: string; role: string; initials: string };
export const mockUsers: MockUser[] = [
  { id: "creator", name: "Penguin Creator", email: "creator@example.com", role: "Creator", initials: "PC" },
  { id: "buyer", name: "Demo Buyer", email: "buyer@example.com", role: "Buyer", initials: "DB" },
  { id: "admin", name: "Shop Admin", email: "admin@example.com", role: "Admin", initials: "SA" },
];

export async function getMockUser(): Promise<MockUser | null> {
  const value = (await cookies()).get(MOCK_SESSION_COOKIE)?.value;
  return mockUsers.find((user) => user.id === value) ?? null;
}
