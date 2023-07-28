-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostCategories" (
    "type" TEXT NOT NULL DEFAULT 'undefined',
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("postId", "categoryId"),
    CONSTRAINT "PostCategories_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PostCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PostCategories" ("categoryId", "postId", "type") SELECT "categoryId", "postId", "type" FROM "PostCategories";
DROP TABLE "PostCategories";
ALTER TABLE "new_PostCategories" RENAME TO "PostCategories";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
