import {Request, Response} from "express";
import {Body, Controller, Get, Post, Req, Res, HttpCode, UseGuards} from "@nestjs/common";
import {promisify} from "util";

import {Public, User} from "../common/decorators";
import {IUserCreateFields} from "../user/interfaces";
import {LoginGuard, FacebookGuard, GoogleGuard, OneloginGuard, BiometricGuard, LdapGuard} from "../common/guards";
import {UserEntity} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get("/login")
  public main(@User() user: UserEntity): string {
    return `
      <html>
         <script>
					function handleclick(el) {
            window.open(el.href, '_blank', 'height=600,width=800,top=0,left=0');
            return false
					}
				</script>
        <body>
          <p>logged in as ${JSON.stringify(user)}</p>
          <form action="/auth/login" method="post">
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="submit" />
          </form>
          <p>or login with other providers</p>
          <ul>
            <li><a href="/auth/google" onClick="return handleclick(this)">google</a></li>
            <li><a href="/auth/facebook" onClick="return handleclick(this)">facebook</a></li>
            <li><a href="/auth/onelogin" onClick="return handleclick(this)">onelogin</a></li>
          </ul>
        </body>
      </html>
    `;
  }

  @Public()
  @UseGuards(LoginGuard)
  @Post("/login")
  public login(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Public()
  @HttpCode(204)
  @Get("/logout")
  public logout(@Req() req: Request, @Res() res: Response): void {
    // @ts-ignore
    req.session.destroy();
    req.logout();
    res.clearCookie("nest");
    res.send("");
  }

  @Public()
  @Get("/signup")
  public async signup(@Body() data: IUserCreateFields, @Req() req: Request): Promise<UserEntity> {
    const user = await this.userService.create(data);
    // @ts-ignore
    await promisify(req.logIn.bind(req))(user);
    return user;
  }

  @Public()
  @UseGuards(BiometricGuard)
  @HttpCode(200)
  @Post("/biometric")
  public biometric(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Public()
  @Get("/google")
  @UseGuards(GoogleGuard)
  public googleLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Public()
  @Get("/google/callback")
  @UseGuards(GoogleGuard)
  public googleLoginCallback(@User() user: UserEntity): string {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert('${JSON.stringify(user)}');
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }

  @Public()
  @Get("/facebook")
  @UseGuards(FacebookGuard)
  public facebookLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Public()
  @Get("/facebook/callback")
  @UseGuards(FacebookGuard)
  public facebookLoginCallback(@User() user: UserEntity): string {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert('${JSON.stringify(user)}');
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }

  @Public()
  @UseGuards(OneloginGuard)
  @Get("/onelogin")
  public oneloginLogin(): void {
    // initiates the OneLogin login flow
  }

  @Public()
  @UseGuards(OneloginGuard)
  @Get("/onelogin/callback")
  public oneloginLoginCallback(@User() user: UserEntity): string {
    return `
      <html>
      	<script>
					function handleLoad() {
					  alert('${JSON.stringify(user)}');
						window.close();
					}
				</script>
        <body onload="handleLoad()" />
      </html>
    `;
  }

  @Public()
  @HttpCode(200)
  @UseGuards(LdapGuard)
  @Post("/ldap")
  public ldap(): void {
    // initiates the Ldap login flow
  }
}
