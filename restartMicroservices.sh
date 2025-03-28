# Definir cores para melhor legibilidade
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Iniciando reconstrução completa dos microserviços ===${NC}"

# Parar todos os contêineres em execução
echo -e "${BLUE}Parando contêineres em execução...${NC}"
docker-compose down

# Limpar e reconstruir cada microserviço
echo -e "${BLUE}Reconstruindo microserviço de aluguel...${NC}"
cd aluguel-service
npm run clean || true
npm run build
cd ..

echo -e "${BLUE}Reconstruindo microserviço de equipamento...${NC}"
cd equipamento-service
npm run clean || true
npm run build
cd ..

echo -e "${BLUE}Reconstruindo microserviço externo...${NC}"
cd externo-service
npm run clean || true
npm run build
cd ..

# Reconstruir imagens Docker sem usar cache
echo -e "${BLUE}Reconstruindo imagens Docker sem cache...${NC}"
docker-compose build --no-cache

# Iniciar os contêineres
echo -e "${BLUE}Iniciando contêineres...${NC}"
docker-compose up -d

# Verificar status dos contêineres
echo -e "${BLUE}Verificando status dos contêineres...${NC}"
sleep 5
docker-compose ps

echo -e "${GREEN}=== Reconstrução completa finalizada ===${NC}"