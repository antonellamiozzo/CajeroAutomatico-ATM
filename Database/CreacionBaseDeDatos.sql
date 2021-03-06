USE [master]
GO
/****** Object:  Database [CajeroAutomatico]    Script Date: 15-Sep-20 1:24:02 AM ******/
CREATE DATABASE [CajeroAutomatico]
 GO
ALTER DATABASE [CajeroAutomatico] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CajeroAutomatico].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CajeroAutomatico] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET ARITHABORT OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CajeroAutomatico] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CajeroAutomatico] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CajeroAutomatico] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CajeroAutomatico] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET RECOVERY FULL 
GO
ALTER DATABASE [CajeroAutomatico] SET  MULTI_USER 
GO
ALTER DATABASE [CajeroAutomatico] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CajeroAutomatico] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CajeroAutomatico] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CajeroAutomatico] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [CajeroAutomatico] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'CajeroAutomatico', N'ON'
GO
USE [CajeroAutomatico]
GO
/****** Object:  Table [dbo].[Operacion]    Script Date: 15-Sep-20 1:24:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Operacion](
	[IdOperacion] [int] IDENTITY(1,1) NOT NULL,
	[NroTarjeta] [varchar](50) NOT NULL,
	[TipoOperacion] [varchar](5) NULL,
	[CantidadARetirar] [bigint] NULL,
	[FechaOperacion] [datetime] NULL,
 CONSTRAINT [PK_Operacion] PRIMARY KEY CLUSTERED 
(
	[IdOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tarjetas]    Script Date: 15-Sep-20 1:24:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tarjetas](
	[PinTarjeta] [varchar](6) NULL,
	[FechaVencimiento] [datetime] NULL,
	[NroTarjeta] [varchar](50) NOT NULL,
	[SaldoActual] [bigint] NULL,
	[IsBlocked] [bit] NULL,
 CONSTRAINT [PK_Tarjetas] PRIMARY KEY CLUSTERED 
(
	[NroTarjeta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO

INSERT [dbo].[Tarjetas] ([PinTarjeta], [FechaVencimiento], [NroTarjeta], [SaldoActual], [IsBlocked]) VALUES (N'2222', GETDATE(), N'4546-1111-1111-1111', 100000, 0)
INSERT [dbo].[Tarjetas] ([PinTarjeta], [FechaVencimiento], [NroTarjeta], [SaldoActual], [IsBlocked]) VALUES (N'1111',GETDATE(), N'4546-2222-2222-2222', 24400, 0)
ALTER TABLE [dbo].[Operacion]  WITH CHECK ADD  CONSTRAINT [FK_Operacion_Tarjetas] FOREIGN KEY([NroTarjeta])
REFERENCES [dbo].[Tarjetas] ([NroTarjeta])
GO
ALTER TABLE [dbo].[Operacion] CHECK CONSTRAINT [FK_Operacion_Tarjetas]
GO
/****** Object:  StoredProcedure [dbo].[BlockCreditCard]    Script Date: 15-Sep-20 1:24:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BlockCreditCard]
@NroTarjeta varchar(50)
AS

IF(EXISTS( SELECT * FROM dbo.Tarjetas where NroTarjeta = @NroTarjeta))
	BEGIN
		UPDATE TARJETAS
		SET IsBlocked = 1
		WHERE NroTarjeta = @NroTarjeta
	END

GO
/****** Object:  StoredProcedure [dbo].[CommitOperation]    Script Date: 15-Sep-20 1:24:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE PROCEDURE [dbo].[CommitOperation]
	
	@NroTarjeta varchar(50),
	@TipoOperacion varchar(5),
	@CantidadARetirar int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   IF(@TipoOperacion = '1')
		BEGIN
			IF(EXISTS(SELECT * FROM dbo.Tarjetas t WHERE t.NroTarjeta = @NroTarjeta and t.SaldoActual >= @CantidadARetirar))
				BEGIN
					INSERT INTO dbo.Operacion (NroTarjeta, CantidadARetirar,FechaOperacion,TipoOperacion)
					VALUES(@NroTarjeta, @CantidadARetirar, GETDATE(), @TipoOperacion)

					UPDATE dbo.Tarjetas
					SET SaldoActual = SaldoActual - @CantidadARetirar
					WHERE NroTarjeta = @NroTarjeta

					SELECT TOP 1 t.NroTarjeta, t.SaldoActual, o.FechaOperacion from Tarjetas t 
					join Operacion o
					on o.NroTarjeta = t.NroTarjeta
					order by o.FechaOperacion

					RETURN;
				END
			ELSE
				BEGIN
					SELECT TOP 1 t.NroTarjeta, t.SaldoActual, t.FechaVencimiento as 'FechaOperacion' FROM dbo.Tarjetas t WHERE t.NroTarjeta = @NroTarjeta and t.SaldoActual >= @CantidadARetirar
					RETURN;
				END
		END
	ELSE
		PRINT N'sdf';  
		INSERT INTO dbo.Operacion (NroTarjeta, CantidadARetirar,FechaOperacion,TipoOperacion)
		VALUES(@NroTarjeta, @CantidadARetirar, GETDATE(), @TipoOperacion)	
		
		SELECT TOP 1 t.NroTarjeta, t.SaldoActual, t.FechaVencimiento as 'FechaOperacion' from Tarjetas t
		where t.NroTarjeta = @NroTarjeta

		RETURN;
END

GO
USE [master]
GO
ALTER DATABASE [CajeroAutomatico] SET  READ_WRITE 
GO
