-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profiles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profiles" ("id", "userId") SELECT "id", "userId" FROM "Profiles";
DROP TABLE "Profiles";
ALTER TABLE "new_Profiles" RENAME TO "Profiles";
CREATE UNIQUE INDEX "Profiles_userId_key" ON "Profiles"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
