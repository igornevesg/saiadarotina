import { NextResponse } from "next/server";
import { getAdminDashboardData } from "@/services/adminService";

export async function GET() {
  const data = await getAdminDashboardData();
  return NextResponse.json(data);
}