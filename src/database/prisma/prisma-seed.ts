import { prisma } from '@/database/prisma/prisma-client.ts'

async function main() {
  await prisma.task.createMany({
    data: [
      {
        name: 'Comprar pão',
        description: 'Ir na padaria antes das 8h',
        due_date: new Date(Date.now() + 86400000),
        priority: 'MEDIUM',
      },
      {
        name: 'Estudar React',
        description: 'Focar em hooks e context API',
        due_date: null,
        priority: 'HIGH',
      },
      {
        name: 'Reunião com o time',
        description: null,
        due_date: new Date(),
        priority: 'LOW',
      },
      {
        name: 'Enviar relatório',
        due_date: null,
        priority: 'HIGH',
      },
      {
        name: 'Atualizar portfólio',
        description: 'Adicionar últimos projetos',
      },
    ],
  })
}

main()
  .then(() => {
    console.log('Seed concluído')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error('Erro ao rodar seed:', e)
    return prisma.$disconnect().finally(() => process.exit(1))
  })
