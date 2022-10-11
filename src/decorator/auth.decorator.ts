import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/jwtAuth.guard";

export function SetJwtAuth() {
    return applyDecorators(
      UseGuards(JwtAuthGuard)
    );
}