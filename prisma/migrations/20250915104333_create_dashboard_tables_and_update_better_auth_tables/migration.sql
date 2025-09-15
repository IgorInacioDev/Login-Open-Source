/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."FuelType" AS ENUM ('GASOLINE', 'ETHANOL', 'FLEX', 'DIESEL', 'CNG', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "public"."Position" AS ENUM ('MECHANIC', 'TIRE_TECHNICIAN', 'ATTENDANT', 'MANAGER', 'OWNER');

-- CreateEnum
CREATE TYPE "public"."CategoryType" AS ENUM ('PRODUCT', 'SERVICE', 'BOTH');

-- CreateEnum
CREATE TYPE "public"."Unit" AS ENUM ('PIECE', 'KILOGRAM', 'LITER', 'METER', 'SQUARE_METER', 'BOX', 'PAIR');

-- CreateEnum
CREATE TYPE "public"."MovementType" AS ENUM ('IN', 'OUT', 'ADJUSTMENT', 'RETURN');

-- CreateEnum
CREATE TYPE "public"."ServiceOrderStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'WAITING_PARTS', 'WAITING_CUSTOMER', 'COMPLETED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "public"."ServiceStatus" AS ENUM ('PENDING', 'IN_EXECUTION', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('CASH', 'DEBIT_CARD', 'CREDIT_CARD', 'PIX', 'BANK_TRANSFER', 'CHECK', 'INSTALLMENT_PLAN');

-- CreateEnum
CREATE TYPE "public"."SaleStatus" AS ENUM ('OPEN', 'PAID', 'PARTIALLY_PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ReceivableStatus" AS ENUM ('PENDING', 'RECEIVED', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PayableCategory" AS ENUM ('SUPPLIER', 'SALARY', 'COMMISSION', 'RENT', 'ELECTRICITY', 'WATER', 'PHONE', 'INTERNET', 'TAXES', 'OTHERS');

-- CreateEnum
CREATE TYPE "public"."PayableStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_SERVICE', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- DropForeignKey
ALTER TABLE "public"."account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "public"."account";

-- DropTable
DROP TABLE "public"."session";

-- DropTable
DROP TABLE "public"."user";

-- DropTable
DROP TABLE "public"."verification";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verifications" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "documentId" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "birthDate" TIMESTAMP(3),
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vehicles" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER,
    "color" TEXT,
    "plate" TEXT NOT NULL,
    "chassisId" TEXT,
    "fuelType" "public"."FuelType",
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."suppliers" (
    "id" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "companyName" TEXT,
    "documentId" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "salesContact" TEXT,
    "paymentTermDays" INTEGER NOT NULL DEFAULT 30,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "documentId" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "position" "public"."Position" NOT NULL,
    "salary" DECIMAL(10,2),
    "commissionPercent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "hireDate" TIMESTAMP(3),
    "terminationDate" TIMESTAMP(3),
    "address" TEXT,
    "pixKey" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."CategoryType" NOT NULL DEFAULT 'BOTH',
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "internalCode" TEXT,
    "barcode" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "brand" TEXT,
    "unit" "public"."Unit" NOT NULL DEFAULT 'PIECE',
    "costPrice" DECIMAL(10,2) NOT NULL,
    "salePrice" DECIMAL(10,2) NOT NULL,
    "profitMargin" DECIMAL(5,2) NOT NULL,
    "currentStock" INTEGER NOT NULL DEFAULT 0,
    "minimumStock" INTEGER NOT NULL DEFAULT 0,
    "maximumStock" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT,
    "ncmCode" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."services" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "estimatedTimeMinutes" INTEGER,
    "mechanicCommission" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stock_movements" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "movementType" "public"."MovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2),
    "totalValue" DECIMAL(10,2),
    "documentNumber" TEXT,
    "notes" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_orders" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "responsibleEmployeeId" TEXT,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedDeliveryDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "vehicleMileage" INTEGER,
    "reportedProblem" TEXT,
    "executedServices" TEXT,
    "internalNotes" TEXT,
    "customerNotes" TEXT,
    "status" "public"."ServiceOrderStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "public"."Priority" NOT NULL DEFAULT 'NORMAL',
    "totalValue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discountValue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "finalValue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "warrantyDays" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "service_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_order_services" (
    "id" TEXT NOT NULL,
    "serviceOrderId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "employeeId" TEXT,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "additionalDescription" TEXT,
    "executionDate" TIMESTAMP(3),
    "executionTimeMinutes" INTEGER,
    "status" "public"."ServiceStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_order_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_order_products" (
    "id" TEXT NOT NULL,
    "serviceOrderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "additionalDescription" TEXT,
    "isApplied" BOOLEAN NOT NULL DEFAULT false,
    "applicationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_order_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."PaymentType" NOT NULL,
    "feePercent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "receiveDays" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sales" (
    "id" TEXT NOT NULL,
    "saleNumber" TEXT,
    "serviceOrderId" TEXT,
    "customerId" TEXT NOT NULL,
    "employeeId" TEXT,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grossValue" DECIMAL(10,2) NOT NULL,
    "discountValue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "netValue" DECIMAL(10,2) NOT NULL,
    "status" "public"."SaleStatus" NOT NULL DEFAULT 'OPEN',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."receivables" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "installmentNumber" INTEGER NOT NULL DEFAULT 1,
    "value" DECIMAL(10,2) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "status" "public"."ReceivableStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receivables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accounts_payable" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT,
    "employeeId" TEXT,
    "description" TEXT NOT NULL,
    "category" "public"."PayableCategory" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "documentNumber" TEXT,
    "status" "public"."PayableStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_payable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."appointments" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "employeeId" TEXT,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "expectedEndDate" TIMESTAMP(3),
    "requestedService" TEXT,
    "notes" TEXT,
    "status" "public"."AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "reminderSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "public"."sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "customers_documentId_key" ON "public"."customers"("documentId");

-- CreateIndex
CREATE INDEX "customers_documentId_idx" ON "public"."customers"("documentId");

-- CreateIndex
CREATE INDEX "customers_name_idx" ON "public"."customers"("name");

-- CreateIndex
CREATE INDEX "customers_phone_idx" ON "public"."customers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_key" ON "public"."vehicles"("plate");

-- CreateIndex
CREATE INDEX "vehicles_plate_idx" ON "public"."vehicles"("plate");

-- CreateIndex
CREATE INDEX "vehicles_customerId_idx" ON "public"."vehicles"("customerId");

-- CreateIndex
CREATE INDEX "vehicles_brand_model_idx" ON "public"."vehicles"("brand", "model");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_documentId_key" ON "public"."suppliers"("documentId");

-- CreateIndex
CREATE INDEX "suppliers_documentId_idx" ON "public"."suppliers"("documentId");

-- CreateIndex
CREATE INDEX "suppliers_tradeName_idx" ON "public"."suppliers"("tradeName");

-- CreateIndex
CREATE UNIQUE INDEX "employees_documentId_key" ON "public"."employees"("documentId");

-- CreateIndex
CREATE INDEX "employees_documentId_idx" ON "public"."employees"("documentId");

-- CreateIndex
CREATE INDEX "employees_position_idx" ON "public"."employees"("position");

-- CreateIndex
CREATE INDEX "employees_isActive_idx" ON "public"."employees"("isActive");

-- CreateIndex
CREATE INDEX "categories_type_idx" ON "public"."categories"("type");

-- CreateIndex
CREATE UNIQUE INDEX "products_internalCode_key" ON "public"."products"("internalCode");

-- CreateIndex
CREATE INDEX "products_internalCode_idx" ON "public"."products"("internalCode");

-- CreateIndex
CREATE INDEX "products_barcode_idx" ON "public"."products"("barcode");

-- CreateIndex
CREATE INDEX "products_name_idx" ON "public"."products"("name");

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "public"."products"("categoryId");

-- CreateIndex
CREATE INDEX "products_minimumStock_currentStock_idx" ON "public"."products"("minimumStock", "currentStock");

-- CreateIndex
CREATE INDEX "services_name_idx" ON "public"."services"("name");

-- CreateIndex
CREATE INDEX "services_categoryId_idx" ON "public"."services"("categoryId");

-- CreateIndex
CREATE INDEX "stock_movements_productId_createdAt_idx" ON "public"."stock_movements"("productId", "createdAt");

-- CreateIndex
CREATE INDEX "stock_movements_movementType_createdAt_idx" ON "public"."stock_movements"("movementType", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "service_orders_orderNumber_key" ON "public"."service_orders"("orderNumber");

-- CreateIndex
CREATE INDEX "service_orders_orderNumber_idx" ON "public"."service_orders"("orderNumber");

-- CreateIndex
CREATE INDEX "service_orders_status_entryDate_idx" ON "public"."service_orders"("status", "entryDate");

-- CreateIndex
CREATE INDEX "service_orders_customerId_vehicleId_idx" ON "public"."service_orders"("customerId", "vehicleId");

-- CreateIndex
CREATE INDEX "service_orders_responsibleEmployeeId_entryDate_idx" ON "public"."service_orders"("responsibleEmployeeId", "entryDate");

-- CreateIndex
CREATE INDEX "service_order_services_serviceOrderId_idx" ON "public"."service_order_services"("serviceOrderId");

-- CreateIndex
CREATE INDEX "service_order_services_employeeId_executionDate_idx" ON "public"."service_order_services"("employeeId", "executionDate");

-- CreateIndex
CREATE INDEX "service_order_products_serviceOrderId_idx" ON "public"."service_order_products"("serviceOrderId");

-- CreateIndex
CREATE INDEX "service_order_products_productId_idx" ON "public"."service_order_products"("productId");

-- CreateIndex
CREATE INDEX "payment_methods_type_idx" ON "public"."payment_methods"("type");

-- CreateIndex
CREATE UNIQUE INDEX "sales_saleNumber_key" ON "public"."sales"("saleNumber");

-- CreateIndex
CREATE INDEX "sales_saleDate_idx" ON "public"."sales"("saleDate");

-- CreateIndex
CREATE INDEX "sales_status_idx" ON "public"."sales"("status");

-- CreateIndex
CREATE INDEX "sales_customerId_saleDate_idx" ON "public"."sales"("customerId", "saleDate");

-- CreateIndex
CREATE INDEX "receivables_dueDate_status_idx" ON "public"."receivables"("dueDate", "status");

-- CreateIndex
CREATE INDEX "receivables_saleId_idx" ON "public"."receivables"("saleId");

-- CreateIndex
CREATE INDEX "accounts_payable_dueDate_status_idx" ON "public"."accounts_payable"("dueDate", "status");

-- CreateIndex
CREATE INDEX "accounts_payable_category_idx" ON "public"."accounts_payable"("category");

-- CreateIndex
CREATE INDEX "accounts_payable_supplierId_idx" ON "public"."accounts_payable"("supplierId");

-- CreateIndex
CREATE INDEX "appointments_appointmentDate_status_idx" ON "public"."appointments"("appointmentDate", "status");

-- CreateIndex
CREATE INDEX "appointments_employeeId_appointmentDate_idx" ON "public"."appointments"("employeeId", "appointmentDate");

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vehicles" ADD CONSTRAINT "vehicles_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."services" ADD CONSTRAINT "services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_movements" ADD CONSTRAINT "stock_movements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_movements" ADD CONSTRAINT "stock_movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_orders" ADD CONSTRAINT "service_orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_orders" ADD CONSTRAINT "service_orders_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_orders" ADD CONSTRAINT "service_orders_responsibleEmployeeId_fkey" FOREIGN KEY ("responsibleEmployeeId") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_orders" ADD CONSTRAINT "service_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_order_services" ADD CONSTRAINT "service_order_services_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "public"."service_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_order_services" ADD CONSTRAINT "service_order_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_order_services" ADD CONSTRAINT "service_order_services_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_order_products" ADD CONSTRAINT "service_order_products_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "public"."service_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_order_products" ADD CONSTRAINT "service_order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_serviceOrderId_fkey" FOREIGN KEY ("serviceOrderId") REFERENCES "public"."service_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."receivables" ADD CONSTRAINT "receivables_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."receivables" ADD CONSTRAINT "receivables_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accounts_payable" ADD CONSTRAINT "accounts_payable_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accounts_payable" ADD CONSTRAINT "accounts_payable_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
