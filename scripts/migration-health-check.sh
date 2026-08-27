#!/bin/bash
# ============================================================================
# MIGRATION HEALTH CHECK - 5S App
# ============================================================================
# Este script verifica que todo está correcto después de una migración de chat.
# Ejecutar: bash scripts/migration-health-check.sh
# ============================================================================

set -e
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "============================================"
echo "  5S APP - MIGRATION HEALTH CHECK"
echo "============================================"
echo ""

ERRORS=0
WARNINGS=0

# 1. Check .env file exists and has correct DATABASE_URL
echo -e "${YELLOW}[1/6] Checking .env file...${NC}"
if [ -f ".env" ]; then
    if grep -q "postgresql://" .env; then
        DB_URL=$(grep DATABASE_URL .env | head -1)
        if echo "$DB_URL" | grep -q "neon.tech"; then
            echo -e "${GREEN}✓ DATABASE_URL points to Neon PostgreSQL${NC}"
        else
            echo -e "${RED}✗ DATABASE_URL does NOT point to Neon!${NC}"
            echo "  Current: $DB_URL"
            ((ERRORS++))
        fi
    else
        echo -e "${RED}✗ DATABASE_URL is not postgresql:// format${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗ .env file not found!${NC}"
    ((ERRORS++))
fi

# 2. Check Prisma schema exists
echo ""
echo -e "${YELLOW}[2/6] Checking Prisma schema...${NC}"
if [ -f "prisma/schema.prisma" ]; then
    # Verify Session model has id field
    if grep -q 'model Session' prisma/schema.prisma; then
        echo -e "${GREEN}✓ Prisma schema found with Session model${NC}"
    else
        echo -e "${RED}✗ Session model missing from schema!${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗ prisma/schema.prisma not found!${NC}"
    ((ERRORS++))
fi

# 3. Check Prisma client is generated
echo ""
echo -e "${YELLOW}[3/6] Checking Prisma client...${NC}"
if [ -d "node_modules/@prisma/client" ]; then
    echo -e "${GREEN}✓ Prisma client generated${NC}"
else
    echo -e "${RED}✗ Prisma client not generated! Run: npx prisma generate${NC}"
    ((ERRORS++))
fi

# 4. Test database connection
echo ""
echo -e "${YELLOW}[4/6] Testing database connection...${NC}"
cd /home/z/my-project
if node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const count = await prisma.user.count();
    console.log('USERS:' + count);
}
main().finally(() => prisma.\$disconnect());
" 2>/dev/null; then
    echo -e "${GREEN}✓ Database connection successful${NC}"
else
    echo -e "${RED}✗ Database connection failed!${NC}"
    ((ERRORS++))
fi

# 5. Check for debug endpoints (should not be in production)
echo ""
echo -e "${YELLOW}[5/6] Checking for debug endpoints...${NC}"
if [ -d "src/app/api/debug" ] || [ -d "src/app/api/debug-login" ]; then
    echo -e "${YELLOW}⚠ Debug endpoints found (should remove before production)${NC}"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓ No debug endpoints found${NC}"
fi

# 6. Check git status
echo ""
echo -e "${YELLOW}[6/6] Checking git status...${NC}"
if git status --porcelain | grep -q "^M\|^??"; then
    echo -e "${YELLOW}⚠ Uncommitted changes detected${NC}"
    git status --short | head -5
    ((WARNINGS++))
else
    echo -e "${GREEN}✓ Working tree clean${NC}"
fi

# Summary
echo ""
echo "============================================"
echo "  RESULTS"
echo "============================================"

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ ERRORS: $ERRORS (must fix before deploy)${NC}"
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️ WARNINGS: $WARNINGS (review recommended)${NC}"
else
    echo -e "${GREEN}✅ ALL CHECKS PASSED - Ready to deploy${NC}"
fi

echo ""
echo "Quick fix commands:"
echo "  npx prisma generate      # Regenerate client"
echo "  npx prisma db pull       # Sync schema from DB"
echo "  git add -A && git commit && git push  # Deploy"
echo ""

exit $ERRORS
