-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "register_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "stackId" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stacks" (
    "id" TEXT NOT NULL,
    "stack" TEXT NOT NULL,

    CONSTRAINT "stacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "applications_id_key" ON "applications"("id");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "stacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
