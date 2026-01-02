import Link from "next/link";
import { Level } from "@/lib/types";

export default function MockTestPage() {
  return (
    <div className="container mx-auto">
      <ul>
        <li>
          <Link href={`/mock-test/${Level.N5}/list`}>Test N5</Link>
        </li>
        <li>
          <Link href={`/mock-test/${Level.N4}/list`}>Test N4</Link>
        </li>
        <li>
          <Link href={`/mock-test/${Level.N3}/list`}>Test N3</Link>
        </li>
        <li>
          <Link href={`/mock-test/${Level.N2}/list`}>Test N2</Link>
        </li>
      </ul>
    </div>
  );
}
