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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'cafe',123.00,'cafe sesi bucks',222,'grande','produto de qualidade'),(2,'cafe novo',12.00,'cafe sesi bucks',2,'grande','bao'),(3,'cafe diferenciado',12.00,'cafe tradicional',222,'grande','bao');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'johndoe','senha123','johndoe@example.com','Atendente','Matutino','1500.00');
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (6,'aline','credito','2024-11-17 01:17:56',4,'2222222','34'),(7,'amauri','pix','2024-11-17 01:19:56',12,'4599050485','2'),(8,'luiza','credito','2024-11-17 01:24:07',1,'45991495889','12'),(10,'Eritiana','pix','2024-11-17 02:33:08',3,'4599050485','12'),(11,'Eritiana','credito','2024-11-17 02:33:21',2,'45991495889','2'),(12,'Eritiana','pix','2024-11-17 02:35:02',3,'45991495889','12'),(13,'fabio','pix','2024-11-17 02:35:31',2,'12','2'),(14,'fabio','pix','2024-11-17 02:39:42',12,'4599050485','2'),(15,'Eritiana','pix','2024-11-17 02:43:37',12,'4599050485','2'),(16,'Eritiana','pix','2024-11-17 02:49:33',12,'4599050485','2'),(17,'Eritiana','pix','2022-05-15 14:30:00',12,'4599050485','2'),(18,'Eritiana','pix','2024-11-17 02:50:21',12,'4599050485','2'),(19,'Eritiana','pix','2022-05-15 14:30:00',12,'4599050485','2'),(20,'Eritiana','2','2024-11-17 02:53:39',12,'12','2'),(21,'Eritiana','12','2024-11-17 02:53:58',23,'4599050485','2'),(22,'Eritiana','12','2022-05-15 14:30:00',23,'4599050485','2'),(23,'Eritiana','12','2024-11-17 02:53:59',23,'4599050485','2'),(24,'Eritiana','12','2022-05-15 14:30:00',23,'4599050485','2'),(25,'Eritiana','12','2024-11-17 02:54:01',23,'4599050485','2'),(26,'Eritiana','12','2022-05-15 14:30:00',23,'4599050485','2'),(27,'Eritiana','pix','2024-11-17 02:54:14',12,'4599050485','2'),(28,'Eritiana','pix','2024-11-17 02:54:25',12,'4599050485','2'),(29,'Eritiana','pix','2022-05-15 14:30:00',12,'4599050485','2'),(30,'Eritiana','pix','2024-11-17 02:55:14',12,'4599050485','2'),(31,'fabio','pix','2024-11-17 02:55:25',12,'4599050485','2'),(32,'amauri','credito','2024-11-17 02:56:10',1,'22222222','1'),(33,'bettiol','credito','2024-11-17 02:56:25',3,'4599050485','2'),(34,'bettiol','credito','2024-11-17 02:56:30',3,'4599050485','2'),(35,'Eritiana','pix','2024-11-17 02:58:12',12,'4599050485','2'),(36,'Eritiana','pix','2024-11-17 02:58:12',12,'4599050485','2'),(37,'Eritiana','pix','2024-11-17 02:58:13',12,'4599050485','2'),(38,'Eritiana','pix','2024-11-17 02:58:13',12,'4599050485','2'),(39,'cafe','pix','2024-11-02 14:30:00',12,'4599050485','2'),(40,'Eritiana','12','2024-11-17 16:26:48',2,'4599050485','2'),(41,'Eritiana','12','2022-05-15 14:30:00',2,'4599050485','2'),(42,'Eritiana','12','2024-11-17 16:26:48',2,'4599050485','2'),(43,'Eritiana','12','2022-05-15 14:30:00',2,'4599050485','2'),(44,'bettiol','pix','2024-11-17 16:27:21',12,'4599050485','2'),(45,'bettiol','pix','2024-11-17 16:27:21',12,'4599050485','2'),(46,'bettiol','pix','2024-11-17 16:27:22',12,'4599050485','2'),(47,'bettiol','pix','2024-11-17 16:27:22',12,'4599050485','2'),(48,'bettiol','pix','2024-11-17 16:27:22',12,'4599050485','2'),(49,'bettiol','pix','2024-11-17 16:27:23',12,'4599050485','2'),(50,'Eritiana','pix','2024-11-17 16:37:31',12,'aaaa','2');
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

-- Dump completed on 2024-11-17 15:45:21
