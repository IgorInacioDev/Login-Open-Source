import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.serviceOrderProduct.deleteMany()
  await prisma.serviceOrderService.deleteMany()
  await prisma.receivable.deleteMany()
  await prisma.sale.deleteMany()
  await prisma.serviceOrder.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.accountPayable.deleteMany()
  await prisma.stockMovement.deleteMany()
  await prisma.product.deleteMany()
  await prisma.service.deleteMany()
  await prisma.category.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.supplier.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.paymentMethod.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Criar usuários
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: 'user_admin',
        name: 'João Silva',
        email: 'admin@oficina.com',
        emailVerified: true,
        image: null,
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_mecanico',
        name: 'Carlos Santos',
        email: 'carlos@oficina.com',
        emailVerified: true,
        image: null,
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_atendente',
        name: 'Maria Oliveira',
        email: 'maria@oficina.com',
        emailVerified: true,
        image: null,
      },
    }),
  ])

  // Criar funcionários
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: 'João Silva',
        documentId: '12345678901',
        email: 'joao@oficina.com',
        phone: '(11) 99999-0001',
        position: 'MANAGER',
        salary: 5000.00,
        commissionPercent: 5.0,
        hireDate: new Date('2020-01-15'),
        address: 'Rua das Flores, 123 - São Paulo/SP',
        pixKey: 'joao@oficina.com',
      },
    }),
    prisma.employee.create({
      data: {
        name: 'Carlos Santos',
        documentId: '12345678902',
        email: 'carlos@oficina.com',
        phone: '(11) 99999-0002',
        position: 'MECHANIC',
        salary: 3500.00,
        commissionPercent: 10.0,
        hireDate: new Date('2021-03-10'),
        address: 'Av. Paulista, 456 - São Paulo/SP',
        pixKey: '11999990002',
      },
    }),
    prisma.employee.create({
      data: {
        name: 'Maria Oliveira',
        documentId: '12345678903',
        email: 'maria@oficina.com',
        phone: '(11) 99999-0003',
        position: 'ATTENDANT',
        salary: 2500.00,
        commissionPercent: 3.0,
        hireDate: new Date('2022-06-01'),
        address: 'Rua Augusta, 789 - São Paulo/SP',
        pixKey: 'maria.oliveira@pix.com',
      },
    }),
    prisma.employee.create({
      data: {
        name: 'Pedro Costa',
        documentId: '12345678904',
        email: 'pedro@oficina.com',
        phone: '(11) 99999-0004',
        position: 'TIRE_TECHNICIAN',
        salary: 3000.00,
        commissionPercent: 8.0,
        hireDate: new Date('2021-09-15'),
        address: 'Rua da Consolação, 321 - São Paulo/SP',
        pixKey: '11999990004',
      },
    }),
  ])

  // Criar fornecedores
  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        tradeName: 'AutoPeças Brasil',
        companyName: 'AutoPeças Brasil Ltda',
        documentId: '12345678000195',
        email: 'vendas@autopecasbrasil.com',
        phone: '(11) 3333-1111',
        address: 'Av. Industrial, 1000 - São Paulo/SP',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        salesContact: 'Roberto Silva',
        paymentTermDays: 30,
      },
    }),
    prisma.supplier.create({
      data: {
        tradeName: 'Pneus & Cia',
        companyName: 'Pneus & Cia Comércio Ltda',
        documentId: '98765432000187',
        email: 'comercial@pneusecia.com',
        phone: '(11) 3333-2222',
        address: 'Rua dos Pneus, 500 - São Paulo/SP',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-890',
        salesContact: 'Ana Costa',
        paymentTermDays: 45,
      },
    }),
    prisma.supplier.create({
      data: {
        tradeName: 'Óleos Premium',
        companyName: 'Óleos Premium Distribuidora Ltda',
        documentId: '11223344000156',
        email: 'vendas@oleospremium.com',
        phone: '(11) 3333-3333',
        address: 'Av. dos Óleos, 200 - São Paulo/SP',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-123',
        salesContact: 'José Santos',
        paymentTermDays: 30,
      },
    }),
  ])

  // Criar clientes
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Antonio Ferreira',
        documentId: '12345678901',
        email: 'antonio@email.com',
        phone: '(11) 98888-1111',
        whatsapp: '(11) 98888-1111',
        address: 'Rua das Palmeiras, 100',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        birthDate: new Date('1980-05-15'),
        notes: 'Cliente preferencial, sempre pontual nos pagamentos',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Empresa XYZ Ltda',
        documentId: '12345678000123',
        email: 'frota@empresaxyz.com',
        phone: '(11) 98888-2222',
        whatsapp: '(11) 98888-2222',
        address: 'Av. Empresarial, 500',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-890',
        notes: 'Empresa com frota de 10 veículos',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Mariana Costa',
        documentId: '98765432109',
        email: 'mariana@email.com',
        phone: '(11) 98888-3333',
        whatsapp: '(11) 98888-3333',
        address: 'Rua dos Jardins, 250',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-123',
        birthDate: new Date('1992-08-22'),
        notes: 'Prefere agendamentos pela manhã',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Roberto Silva',
        documentId: '11122233344',
        email: 'roberto@email.com',
        phone: '(11) 98888-4444',
        whatsapp: '(11) 98888-4444',
        address: 'Av. Central, 800',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-456',
        birthDate: new Date('1975-12-10'),
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Fernanda Lima',
        documentId: '55566677788',
        email: 'fernanda@email.com',
        phone: '(11) 98888-5555',
        whatsapp: '(11) 98888-5555',
        address: 'Rua das Acácias, 150',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-789',
        birthDate: new Date('1988-03-18'),
        notes: 'Sempre solicita orçamento antes dos serviços',
      },
    }),
  ])

  // Criar veículos
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        customerId: customers[0].id,
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        color: 'Prata',
        plate: 'ABC-1234',
        chassisId: '9BWZZZ377VT004251',
        fuelType: 'FLEX',
        mileage: 45000,
        notes: 'Veículo bem conservado',
      },
    }),
    prisma.vehicle.create({
      data: {
        customerId: customers[1].id,
        brand: 'Ford',
        model: 'Transit',
        year: 2019,
        color: 'Branco',
        plate: 'DEF-5678',
        chassisId: '9BFXXZ377VT004252',
        fuelType: 'DIESEL',
        mileage: 80000,
        notes: 'Veículo comercial da frota',
      },
    }),
    prisma.vehicle.create({
      data: {
        customerId: customers[1].id,
        brand: 'Volkswagen',
        model: 'Saveiro',
        year: 2021,
        color: 'Azul',
        plate: 'GHI-9012',
        chassisId: '9BWZZZ377VT004253',
        fuelType: 'FLEX',
        mileage: 25000,
        notes: 'Segundo veículo da frota',
      },
    }),
    prisma.vehicle.create({
      data: {
        customerId: customers[2].id,
        brand: 'Honda',
        model: 'Civic',
        year: 2022,
        color: 'Preto',
        plate: 'JKL-3456',
        chassisId: '9BWZZZ377VT004254',
        fuelType: 'FLEX',
        mileage: 15000,
        notes: 'Veículo novo, ainda na garantia',
      },
    }),
    prisma.vehicle.create({
      data: {
        customerId: customers[3].id,
        brand: 'Chevrolet',
        model: 'Onix',
        year: 2018,
        color: 'Vermelho',
        plate: 'MNO-7890',
        chassisId: '9BWZZZ377VT004255',
        fuelType: 'FLEX',
        mileage: 65000,
        notes: 'Necessita revisão periódica',
      },
    }),
    prisma.vehicle.create({
      data: {
        customerId: customers[4].id,
        brand: 'Hyundai',
        model: 'HB20',
        year: 2023,
        color: 'Branco',
        plate: 'PQR-1357',
        chassisId: '9BWZZZ377VT004256',
        fuelType: 'FLEX',
        mileage: 8000,
        notes: 'Veículo zero km',
      },
    }),
  ])

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Pneus',
        type: 'PRODUCT',
        description: 'Pneus para automóveis e comerciais',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Óleos e Lubrificantes',
        type: 'PRODUCT',
        description: 'Óleos de motor, câmbio e outros lubrificantes',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Filtros',
        type: 'PRODUCT',
        description: 'Filtros de ar, óleo, combustível e cabine',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Serviços Mecânicos',
        type: 'SERVICE',
        description: 'Serviços de mecânica geral',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Serviços de Pneus',
        type: 'SERVICE',
        description: 'Montagem, balanceamento e alinhamento',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Peças Diversas',
        type: 'PRODUCT',
        description: 'Peças automotivas em geral',
      },
    }),
  ])

  // Criar produtos
  const products = await Promise.all([
    prisma.product.create({
      data: {
        categoryId: categories[0].id,
        internalCode: 'PN001',
        barcode: '7891234567890',
        name: 'Pneu Michelin 185/65R15',
        description: 'Pneu Michelin Energy XM2 185/65R15 88H',
        brand: 'Michelin',
        unit: 'PIECE',
        costPrice: 280.00,
        salePrice: 420.00,
        profitMargin: 50.00,
        currentStock: 20,
        minimumStock: 5,
        maximumStock: 50,
        location: 'Estoque A1',
        ncmCode: '40111000',
      },
    }),
    prisma.product.create({
      data: {
        categoryId: categories[0].id,
        internalCode: 'PN002',
        barcode: '7891234567891',
        name: 'Pneu Goodyear 205/55R16',
        description: 'Pneu Goodyear EfficientGrip Performance 205/55R16 91V',
        brand: 'Goodyear',
        unit: 'PIECE',
        costPrice: 350.00,
        salePrice: 525.00,
        profitMargin: 50.00,
        currentStock: 15,
        minimumStock: 4,
        maximumStock: 40,
        location: 'Estoque A2',
        ncmCode: '40111000',
      },
    }),
    prisma.product.create({
      data: {
        categoryId: categories[1].id,
        internalCode: 'OL001',
        barcode: '7891234567892',
        name: 'Óleo Motor Castrol 5W30 1L',
        description: 'Óleo Castrol GTX 5W30 Sintético 1 Litro',
        brand: 'Castrol',
        unit: 'LITER',
        costPrice: 25.00,
        salePrice: 45.00,
        profitMargin: 80.00,
        currentStock: 50,
        minimumStock: 10,
        maximumStock: 100,
        location: 'Estoque B1',
        ncmCode: '27101981',
      },
    }),
    prisma.product.create({
      data: {
        categoryId: categories[1].id,
        internalCode: 'OL002',
        barcode: '7891234567893',
        name: 'Óleo Motor Mobil 10W40 1L',
        description: 'Óleo Mobil Super 2000 10W40 Semissintético 1 Litro',
        brand: 'Mobil',
        unit: 'LITER',
        costPrice: 18.00,
        salePrice: 32.00,
        profitMargin: 77.78,
        currentStock: 40,
        minimumStock: 8,
        maximumStock: 80,
        location: 'Estoque B2',
        ncmCode: '27101981',
      },
    }),
    prisma.product.create({
      data: {
        categoryId: categories[2].id,
        internalCode: 'FT001',
        barcode: '7891234567894',
        name: 'Filtro de Óleo Mann W610/3',
        description: 'Filtro de Óleo Mann W610/3 para VW/Audi',
        brand: 'Mann',
        unit: 'PIECE',
        costPrice: 15.00,
        salePrice: 28.00,
        profitMargin: 86.67,
        currentStock: 30,
        minimumStock: 5,
        maximumStock: 60,
        location: 'Estoque C1',
        ncmCode: '84219990',
      },
    }),
    prisma.product.create({
      data: {
        categoryId: categories[2].id,
        internalCode: 'FT002',
        barcode: '7891234567895',
        name: 'Filtro de Ar Tecfil ARS1234',
        description: 'Filtro de Ar Tecfil ARS1234 para Honda Civic',
        brand: 'Tecfil',
        unit: 'PIECE',
        costPrice: 22.00,
        salePrice: 38.00,
        profitMargin: 72.73,
        currentStock: 25,
        minimumStock: 5,
        maximumStock: 50,
        location: 'Estoque C2',
        ncmCode: '84219990',
      },
    }),
  ])

  // Criar serviços
  const services = await Promise.all([
    prisma.service.create({
      data: {
        categoryId: categories[3].id,
        name: 'Troca de Óleo',
        description: 'Troca de óleo do motor com filtro',
        price: 80.00,
        estimatedTimeMinutes: 30,
        mechanicCommission: 15.00,
      },
    }),
    prisma.service.create({
      data: {
        categoryId: categories[3].id,
        name: 'Revisão Completa',
        description: 'Revisão completa do veículo com checklist',
        price: 250.00,
        estimatedTimeMinutes: 120,
        mechanicCommission: 20.00,
      },
    }),
    prisma.service.create({
      data: {
        categoryId: categories[4].id,
        name: 'Montagem de Pneu',
        description: 'Montagem e balanceamento de pneu',
        price: 25.00,
        estimatedTimeMinutes: 15,
        mechanicCommission: 30.00,
      },
    }),
    prisma.service.create({
      data: {
        categoryId: categories[4].id,
        name: 'Alinhamento',
        description: 'Alinhamento de direção',
        price: 60.00,
        estimatedTimeMinutes: 45,
        mechanicCommission: 25.00,
      },
    }),
    prisma.service.create({
      data: {
        categoryId: categories[4].id,
        name: 'Balanceamento',
        description: 'Balanceamento das 4 rodas',
        price: 40.00,
        estimatedTimeMinutes: 30,
        mechanicCommission: 25.00,
      },
    }),
    prisma.service.create({
      data: {
        categoryId: categories[3].id,
        name: 'Troca de Pastilha de Freio',
        description: 'Troca das pastilhas de freio dianteiras',
        price: 120.00,
        estimatedTimeMinutes: 60,
        mechanicCommission: 20.00,
      },
    }),
  ])

  // Criar métodos de pagamento
  const paymentMethods = await Promise.all([
    prisma.paymentMethod.create({
      data: {
        name: 'Dinheiro',
        type: 'CASH',
        feePercent: 0,
        receiveDays: 0,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: 'PIX',
        type: 'PIX',
        feePercent: 0,
        receiveDays: 0,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: 'Cartão de Débito',
        type: 'DEBIT_CARD',
        feePercent: 2.5,
        receiveDays: 1,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: 'Cartão de Crédito',
        type: 'CREDIT_CARD',
        feePercent: 4.5,
        receiveDays: 30,
      },
    }),
  ])

  // Criar contas bancárias
  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        id: 'account_google_123',
        accountId: 'google_123456',
        providerId: 'google',
        userId: users[0].id,
        accessToken: 'access_token_example',
        scope: 'openid email profile',
      },
    }),
    prisma.account.create({
      data: {
        id: 'account_github_456',
        accountId: 'github_789012',
        providerId: 'github',
        userId: users[1].id,
        accessToken: 'access_token_example_2',
        scope: 'user:email',
      },
    }),
  ])

  // Criar sessões
  const sessions = await Promise.all([
    prisma.session.create({
      data: {
        id: 'session_123',
        token: 'session_token_123456789',
        userId: users[0].id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }),
    prisma.session.create({
      data: {
        id: 'session_456',
        token: 'session_token_987654321',
        userId: users[1].id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    }),
  ])

  // Criar tokens de verificação
  const verifications = await Promise.all([
    prisma.verification.create({
      data: {
        id: 'verif_' + Date.now() + '_1',
        identifier: 'novo@usuario.com',
        value: 'verification_token_123',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
      },
    }),
    prisma.verification.create({
      data: {
        id: 'verif_' + Date.now() + '_2',
        identifier: 'outro@usuario.com',
        value: 'verification_token_456',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
      },
    }),
  ])

  console.log('✅ Dados básicos criados com sucesso!')

  // Criar ordens de serviço
  const serviceOrders = await Promise.all([
    prisma.serviceOrder.create({
      data: {
        orderNumber: 'OS-2024-001',
        customerId: customers[0].id,
        vehicleId: vehicles[0].id,
        responsibleEmployeeId: employees[1].id,
        entryDate: new Date('2024-01-15T08:00:00'),
        expectedDeliveryDate: new Date('2024-01-15T17:00:00'),
        deliveryDate: new Date('2024-01-15T16:30:00'),
        vehicleMileage: 45000,
        reportedProblem: 'Troca de óleo e revisão geral',
        executedServices: 'Realizada troca de óleo e filtro, verificação geral do veículo',
        status: 'DELIVERED',
        priority: 'NORMAL',
        totalValue: 180.00,
        discountValue: 0,
        finalValue: 180.00,
        warrantyDays: 30,
      },
    }),
    prisma.serviceOrder.create({
      data: {
        orderNumber: 'OS-2024-002',
        customerId: customers[2].id,
        vehicleId: vehicles[3].id,
        responsibleEmployeeId: employees[1].id,
        entryDate: new Date('2024-01-20T09:00:00'),
        expectedDeliveryDate: new Date('2024-01-22T17:00:00'),
        vehicleMileage: 15000,
        reportedProblem: 'Troca de 4 pneus e alinhamento',
        executedServices: 'Montagem de 4 pneus novos, balanceamento e alinhamento',
        status: 'COMPLETED',
        priority: 'HIGH',
        totalValue: 1780.00,
        discountValue: 80.00,
        finalValue: 1700.00,
        warrantyDays: 90,
      },
    }),
    prisma.serviceOrder.create({
      data: {
        orderNumber: 'OS-2024-003',
        customerId: customers[1].id,
        vehicleId: vehicles[1].id,
        responsibleEmployeeId: employees[1].id,
        entryDate: new Date('2024-01-25T10:00:00'),
        expectedDeliveryDate: new Date('2024-01-26T17:00:00'),
        vehicleMileage: 80000,
        reportedProblem: 'Revisão dos 80.000 km',
        executedServices: 'Em andamento - troca de óleo, filtros e verificação geral',
        status: 'IN_PROGRESS',
        priority: 'NORMAL',
        totalValue: 450.00,
        discountValue: 0,
        finalValue: 450.00,
        warrantyDays: 30,
      },
    }),
    prisma.serviceOrder.create({
      data: {
        orderNumber: 'OS-2024-004',
        customerId: customers[3].id,
        vehicleId: vehicles[4].id,
        responsibleEmployeeId: employees[2].id,
        entryDate: new Date(),
        expectedDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        vehicleMileage: 65000,
        reportedProblem: 'Troca de pastilhas de freio',
        status: 'OPEN',
        priority: 'HIGH',
        totalValue: 0,
        discountValue: 0,
        finalValue: 0,
        warrantyDays: 30,
      },
    }),
  ])

  // Criar agendamentos
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        customerId: customers[4].id,
        vehicleId: vehicles[5].id,
        employeeId: users[1].id,
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias no futuro
        expectedEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // +2 horas
        requestedService: 'Primeira revisão - 10.000 km',
        notes: 'Cliente prefere horário da manhã',
        status: 'SCHEDULED',
      },
    }),
    prisma.appointment.create({
      data: {
        customerId: customers[0].id,
        vehicleId: vehicles[0].id,
        employeeId: users[1].id,
        appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias no futuro
        expectedEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // +1 hora
        requestedService: 'Balanceamento e alinhamento',
        notes: 'Veículo puxando para a direita',
        status: 'CONFIRMED',
      },
    }),
    prisma.appointment.create({
      data: {
        customerId: customers[1].id,
        vehicleId: vehicles[2].id,
        employeeId: users[2].id,
        appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias no futuro
        expectedEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // +3 horas
        requestedService: 'Revisão completa da frota',
        notes: 'Agendar para sábado pela manhã',
        status: 'SCHEDULED',
      },
    }),
  ])

  // Criar movimentações de estoque
  await Promise.all([
    prisma.stockMovement.create({
      data: {
        productId: products[0].id,
        movementType: 'IN',
        quantity: 30,
        unitPrice: 280.00,
        totalValue: 8400.00,
        documentNumber: 'NF-001',
        notes: 'Compra inicial de estoque',
        userId: users[0].id,
        createdAt: new Date('2024-01-01'),
      },
    }),
    prisma.stockMovement.create({
      data: {
        productId: products[0].id,
        movementType: 'OUT',
        quantity: 4,
        unitPrice: 420.00,
        totalValue: 1680.00,
        documentNumber: 'OS-2024-002',
        notes: 'Saída para OS-2024-002',
        userId: users[1].id,
        createdAt: new Date('2024-01-20'),
      },
    }),
    prisma.stockMovement.create({
      data: {
        productId: products[2].id,
        movementType: 'IN',
        quantity: 60,
        unitPrice: 25.00,
        totalValue: 1500.00,
        documentNumber: 'NF-002',
        notes: 'Reposição de estoque',
        userId: users[0].id,
        createdAt: new Date('2024-01-10'),
      },
    }),
    prisma.stockMovement.create({
      data: {
        productId: products[2].id,
        movementType: 'OUT',
        quantity: 5,
        unitPrice: 45.00,
        totalValue: 225.00,
        documentNumber: 'OS-2024-001',
        notes: 'Saída para OS-2024-001',
        userId: users[1].id,
        createdAt: new Date('2024-01-15'),
      },
    }),
  ])

  // Criar produtos e serviços das ordens de serviço
  await Promise.all([
    // Produtos da OS-2024-001 (Troca de óleo)
    prisma.serviceOrderProduct.create({
      data: {
        serviceOrderId: serviceOrders[0].id,
        productId: products[2].id, // Óleo Motor Castrol
        quantity: 5,
        unitPrice: 45.00,
        totalPrice: 225.00,
        isApplied: true,
        applicationDate: new Date('2024-01-15T10:00:00'),
      },
    }),
    prisma.serviceOrderProduct.create({
      data: {
        serviceOrderId: serviceOrders[0].id,
        productId: products[4].id, // Filtro de Óleo
        quantity: 1,
        unitPrice: 28.00,
        totalPrice: 28.00,
        isApplied: true,
        applicationDate: new Date('2024-01-15T10:30:00'),
      },
    }),
    // Serviços da OS-2024-001
    prisma.serviceOrderService.create({
      data: {
        serviceOrderId: serviceOrders[0].id,
        serviceId: services[0].id, // Troca de Óleo
        quantity: 1,
        unitPrice: 80.00,
        totalPrice: 80.00,
        employeeId: users[1].id,
        status: 'COMPLETED',
        executionDate: new Date('2024-01-15T11:00:00'),
        executionTimeMinutes: 60,
      },
    }),
    // Produtos da OS-2024-002 (4 pneus)
    prisma.serviceOrderProduct.create({
      data: {
        serviceOrderId: serviceOrders[1].id,
        productId: products[0].id, // Pneu Michelin
        quantity: 4,
        unitPrice: 420.00,
        totalPrice: 1680.00,
        isApplied: true,
        applicationDate: new Date('2024-01-20T14:00:00'),
      },
    }),
    // Serviços da OS-2024-002
    prisma.serviceOrderService.create({
      data: {
        serviceOrderId: serviceOrders[1].id,
        serviceId: services[2].id, // Montagem de Pneu
        quantity: 4,
        unitPrice: 25.00,
        totalPrice: 100.00,
        employeeId: users[2].id,
        status: 'COMPLETED',
        executionDate: new Date('2024-01-20T15:00:00'),
        executionTimeMinutes: 120,
      },
    }),
    prisma.serviceOrderService.create({
      data: {
        serviceOrderId: serviceOrders[1].id,
        serviceId: services[3].id, // Alinhamento
        quantity: 1,
        unitPrice: 60.00,
        totalPrice: 60.00,
        employeeId: users[2].id,
        status: 'COMPLETED',
        executionDate: new Date('2024-01-20T16:00:00'),
        executionTimeMinutes: 45,
      },
    }),
  ])

  // Criar vendas
  const sales = await Promise.all([
    prisma.sale.create({
      data: {
        saleNumber: 'VD-2024-001',
        customerId: customers[0].id,
        employeeId: users[2].id,
        saleDate: new Date('2024-01-10T14:30:00'),
        grossValue: 90.00,
        discountValue: 5.00,
        netValue: 85.00,

        status: 'PAID',
        notes: 'Venda de óleo de motor',
      },
    }),
    prisma.sale.create({
      data: {
        saleNumber: 'VD-2024-002',
        customerId: customers[2].id,
        employeeId: users[2].id,
        saleDate: new Date('2024-01-18T10:15:00'),
        grossValue: 56.00,
        discountValue: 0,
        netValue: 56.00,

        status: 'PAID',
        notes: 'Venda de filtros',
      },
    }),
    prisma.sale.create({
      data: {
        saleNumber: 'VD-2024-003',
        customerId: customers[1].id,
        employeeId: users[0].id,
        saleDate: new Date('2024-01-22T16:45:00'),
        grossValue: 840.00,
        discountValue: 40.00,
        netValue: 800.00,

        status: 'PAID',
        notes: 'Venda de 2 pneus para frota',
      },
    }),
  ])

  // Criar contas a receber
  await Promise.all([
    prisma.receivable.create({
      data: {
        saleId: sales[0].id,
        paymentMethodId: paymentMethods[1].id, // PIX
        installmentNumber: 1,
        value: 85.00,
        dueDate: new Date('2024-01-10'),
        paymentDate: new Date('2024-01-10'),
        status: 'RECEIVED',
        notes: 'Venda à vista via PIX',
      },
    }),
    prisma.receivable.create({
      data: {
        saleId: sales[1].id,
        paymentMethodId: paymentMethods[0].id, // Dinheiro
        installmentNumber: 1,
        value: 56.00,
        dueDate: new Date('2024-01-18'),
        paymentDate: new Date('2024-01-18'),
        status: 'RECEIVED',
        notes: 'Venda à vista em dinheiro',
      },
    }),
    prisma.receivable.create({
      data: {
        saleId: sales[2].id,
        paymentMethodId: paymentMethods[3].id, // Cartão de Crédito
        installmentNumber: 1,
        value: 400.00,
        dueDate: new Date('2024-01-22'),
        paymentDate: new Date('2024-01-22'),
        status: 'RECEIVED',
        notes: 'Primeira parcela de 2x no cartão',
      },
    }),
    prisma.receivable.create({
      data: {
        saleId: sales[2].id,
        paymentMethodId: paymentMethods[3].id, // Cartão de Crédito
        installmentNumber: 2,
        value: 400.00,
        dueDate: new Date('2024-02-22'),
        status: 'PENDING',
        notes: 'Segunda parcela de 2x no cartão',
      },
    }),
  ])

  // Criar contas a pagar
  await Promise.all([
    prisma.accountPayable.create({
      data: {
        supplierId: suppliers[0].id,
        description: 'Compra de pneus - NF 001',
        category: 'SUPPLIER',
        value: 8400.00,
        dueDate: new Date('2024-02-01'),
        documentNumber: 'NF-001',
        status: 'PENDING',
        notes: 'Pagamento em 30 dias',
      },
    }),
    prisma.accountPayable.create({
      data: {
        employeeId: users[1].id,
        description: 'Salário Janeiro 2024 - Carlos Santos',
        category: 'SALARY',
        value: 3500.00,
        dueDate: new Date('2024-02-05'),
        paymentDate: new Date('2024-02-05'),
        paymentMethod: 'PIX',
        status: 'PAID',
        notes: 'Salário pago via PIX',
      },
    }),
    prisma.accountPayable.create({
      data: {
        description: 'Aluguel da oficina - Janeiro 2024',
        category: 'RENT',
        value: 4500.00,
        dueDate: new Date('2024-02-10'),
        documentNumber: 'ALUGUEL-JAN-2024',
        status: 'PENDING',
        notes: 'Aluguel mensal da oficina',
      },
    }),
  ])

  console.log('🎉 Seed concluído com sucesso!')
  console.log(`📊 Dados criados:`)
  console.log(`   👥 ${users.length} usuários`)
  console.log(`   👷 ${employees.length} funcionários`)
  console.log(`   🏢 ${suppliers.length} fornecedores`)
  console.log(`   👤 ${customers.length} clientes`)
  console.log(`   🚗 ${vehicles.length} veículos`)
  console.log(`   📂 ${categories.length} categorias`)
  console.log(`   📦 ${products.length} produtos`)
  console.log(`   🔧 ${services.length} serviços`)
  console.log(`   💳 ${paymentMethods.length} métodos de pagamento`)
  console.log(`   📋 ${serviceOrders.length} ordens de serviço`)
  console.log(`   📅 ${appointments.length} agendamentos`)
  console.log(`   💰 ${sales.length} vendas`)
  console.log(`   📄 4 contas a receber`)
  console.log(`   🔐 ${accounts.length} contas de autenticação`)
  console.log(`   🎫 ${sessions.length} sessões`)
  console.log(`   ✉️ ${verifications.length} tokens de verificação`)
  console.log(`   📦 6 produtos em ordens de serviço`)
  console.log(`   🔧 4 serviços em ordens de serviço`)
  console.log(`   📊 4 movimentações de estoque`)
  console.log(`   💸 3 contas a pagar`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })