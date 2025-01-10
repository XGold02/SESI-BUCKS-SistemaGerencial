-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: projeto
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `codigo_produtos` int NOT NULL AUTO_INCREMENT,
  `nome_produtos` varchar(45) NOT NULL,
  `valor_produtos` decimal(10,2) NOT NULL,
  `tipo_produtos` varchar(30) NOT NULL,
  `qtd_produtos` int NOT NULL,
  `tamanho_produtos` varchar(10) NOT NULL,
  `descrição_produtos` varchar(200) NOT NULL,
  PRIMARY KEY (`codigo_produtos`),
  UNIQUE KEY `codigo_produto_UNIQUE` (`codigo_produtos`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Café Preto',4.00,'Bebida',50,'Único','Café preto simples'),(2,'Cappuccino',8.00,'Bebida',40,'Único','Café com leite e espuma'),(3,'Café com Leite',5.50,'Bebida',45,'Único','Café coado com leite'),(4,'Bolo de Chocolate',10.00,'Doce',30,'Padrão','Bolo de chocolate'),(5,'Bolo de Cenoura',9.50,'Doce',25,'Padrão','Cobertura de chocolate'),(6,'Croissant',6.00,'Lanche',20,'Padrão','Croissant fresco e crocante'),(7,'Pão de Queijo',3.50,'Lanche',60,'Único','Pão de queijo quentinho'),(8,'Muffin de Maçã',7.00,'Doce',15,'Padrão','Muffin de maçã com canela'),(9,'Suco de Laranja',5.00,'Bebida',50,'Único','Suco de laranja natural'),(10,'Sanduíche de Frango',12.00,'Lanche',30,'Padrão','Sanduíche de frango grelhado');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos_has_vendas`
--

DROP TABLE IF EXISTS `produtos_has_vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos_has_vendas` (
  `produtos_codigo_produtos` int NOT NULL,
  `vendas_codigo_vendas` int NOT NULL,
  `valor_vendas` decimal(10,2) NOT NULL,
  `qtd_vendas` int DEFAULT NULL,
  PRIMARY KEY (`produtos_codigo_produtos`,`vendas_codigo_vendas`),
  KEY `fk_produtos_has_vendas_vendas1_idx` (`vendas_codigo_vendas`),
  KEY `fk_produtos_has_vendas_produtos_idx` (`produtos_codigo_produtos`),
  CONSTRAINT `fk_produtos_has_vendas_produtos` FOREIGN KEY (`produtos_codigo_produtos`) REFERENCES `produtos` (`codigo_produtos`),
  CONSTRAINT `fk_produtos_has_vendas_vendas1` FOREIGN KEY (`vendas_codigo_vendas`) REFERENCES `vendas` (`codigo_vendas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos_has_vendas`
--

LOCK TABLES `produtos_has_vendas` WRITE;
/*!40000 ALTER TABLE `produtos_has_vendas` DISABLE KEYS */;
INSERT INTO `produtos_has_vendas` VALUES (1,1,4.00,1),(2,1,8.00,1),(3,3,5.50,2),(5,2,9.50,1),(6,3,6.00,2),(7,4,3.50,2),(8,4,7.00,1);
/*!40000 ALTER TABLE `produtos_has_vendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codigo_usuarios` int NOT NULL AUTO_INCREMENT,
  `usuario_usuarios` varchar(30) NOT NULL,
  `senha_usuarios` varchar(20) NOT NULL,
  `email_usuarios` varchar(55) NOT NULL,
  `cargo_usuarios` enum('Gerente','Chefe de Cozinha','Atendente','Garçom') NOT NULL,
  `turno_usuarios` enum('Matutino','Vespertino','Noturno') NOT NULL,
  `salario_usuarios` varchar(15) NOT NULL,
  PRIMARY KEY (`codigo_usuarios`),
  UNIQUE KEY `codigo_usuarios_UNIQUE` (`codigo_usuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carlos Pereira','senha123','exemplo@email.com','Gerente','Matutino','3000.00'),(2,'Fernanda Silva','senha123','fernanda.silva@email.com','Atendente','Vespertino','1800.00'),(3,'Roberta Almeida','senha123','roberta.almeida@email.com','Garçom','Noturno','1500.00'),(4,'Lucas Costa','senha123','lucas.costa@email.com','Chefe de Cozinha','Matutino','3200.00'),(5,'PedroThomas','senhasim','pedrothomas@gmail.com','Chefe de Cozinha','Vespertino','12'),(6,'FabioBernardi','senhasim','fabiotiana15@outlook.com','Chefe de Cozinha','Vespertino','300.00');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendas` (
  `codigo_vendas` int NOT NULL AUTO_INCREMENT,
  `nomecliente_vendas` varchar(45) NOT NULL,
  `pagamento_vendas` varchar(20) NOT NULL,
  `data_vendas` datetime NOT NULL,
  `mesa_vendas` int NOT NULL,
  `telefone_vendas` varchar(15) DEFAULT NULL,
  `valortotal_vendas` varchar(20) NOT NULL,
  PRIMARY KEY (`codigo_vendas`),
  UNIQUE KEY `codigo_vendas_UNIQUE` (`codigo_vendas`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,'João Silva','Cartão','2024-11-17 10:30:00',1,'11987654321','28.50'),(2,'Maria Oliveira','Dinheiro','2024-11-17 11:15:00',2,'11987654322','22.00'),(3,'Carlos Souza','Cartão','2024-11-17 14:00:00',3,'11987654323','30.00'),(4,'Ana Costa','Pix','2024-11-17 16:45:00',4,'11987654324','35.50'),(5,'Eritiana','pix','2024-11-17 19:05:04',2,'4599050485','23');
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-17 16:18:26
