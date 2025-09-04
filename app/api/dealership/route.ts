import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { IDealership, IFormPostData } from "@/app/lib/types";

const MY_DB = path.join(process.cwd(), "data", "storage.json");

// Read file
async function readDataFile(): Promise<IDealership[]> {
  try {
    const fileContent = await fs.readFile(MY_DB, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.log("File not found", error);
    return [];
  }
}

// Write to file
async function writeDataFile(data: IDealership[]): Promise<void> {
  await fs.writeFile(MY_DB, JSON.stringify(data, null, 2));
}

// GET
export async function GET() {
  try {
    const data = await readDataFile();

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error reading data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve data",
      },
      { status: 500 }
    );
  }
}

// POST
export async function POST(request: NextRequest) {
  try {
    const body: IFormPostData = await request.json();

    // Create new entry
    const newEntry: IDealership = {
      id: crypto.randomUUID(),
      ...body,
    };

    const existingData = await readDataFile();
    const updatedData = [newEntry, ...existingData];

    // Write back to file
    await writeDataFile(updatedData);

    return NextResponse.json(
      {
        success: true,
        data: newEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save data",
      },
      { status: 500 }
    );
  }
}
